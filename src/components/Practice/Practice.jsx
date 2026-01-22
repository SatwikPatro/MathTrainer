import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateProblem } from "../../utils/MathUtils";
import "./Practice.css";

export default function Practice({ darkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const operator = location.state?.operator;
  const difficulty = location.state?.difficulty;

  const [problem, setProblem] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!operator || !difficulty) {
      navigate("/");
      return;
    }

    setProblem(generateProblem(operator, difficulty));
  }, [operator, difficulty, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsFinished(true);
      // Save history when practice ends
      saveHistory();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Save practice history to localStorage
  const saveHistory = () => {
    const historyItem = {
      operator,
      difficulty,
      score,
      timestamp: Date.now(),
    };

    const existingHistory = JSON.parse(
      localStorage.getItem("mathTrainerHistory") || "[]",
    );
    const updatedHistory = [...existingHistory, historyItem];
    localStorage.setItem("mathTrainerHistory", JSON.stringify(updatedHistory));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAnswer(value);

    // Auto-check when user types a number
    if (value && !isNaN(value)) {
      const numAnswer = parseFloat(value);

      if (numAnswer === problem.correctAnswer) {
        setScore((prev) => prev + 1);
        setProblem(generateProblem(operator, difficulty));
        setAnswer("");
        inputRef.current?.focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    // Prevent 'e', 'E', '+', '-', '.' from being entered
    if (
      e.key === "e" ||
      e.key === "E" ||
      e.key === "+" ||
      e.key === "-" ||
      e.key === "."
    ) {
      e.preventDefault();
    }
  };

  // Capture all number key presses on the page
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Only handle number keys and common input keys
      if (
        /^[0-9\-\.$]/.test(e.key) ||
        e.key === "Backspace" ||
        e.key === "Delete"
      ) {
        // Focus input if not already focused
        if (document.activeElement !== inputRef.current) {
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const goHome = () => {
    navigate("/");
  };

  const restartPractice = () => {
    setProblem(generateProblem(operator, difficulty));
    setAnswer("");
    setScore(0);
    setTimeLeft(60);
    setIsFinished(false);
    inputRef.current?.focus();
  };

  if (!problem) return null;

  if (isFinished) {
    return (
      <main className="practice">
        <div className="results-card">
          <h2 className="results-title">Time's Up!</h2>

          <div className="results-stats">
            <div className="result-stat">
              <div className="result-stat-value">{score}</div>
              <div className="result-stat-label">Score</div>
            </div>
          </div>

          <div className="results-actions">
            <button onClick={restartPractice} className="restart-btn">
              Try Again
            </button>
            <button onClick={goHome} className="back-btn">
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="practice">
      <div className="practice-header">
        <div className="stats">
          <div className="stat">
            <div className="stat-label">Score</div>
            <div className="stat-value">{score}</div>
          </div>
        </div>

        <div className={`timer ${timeLeft <= 10 ? "warning" : ""}`}>
          <div className="timer-value">{timeLeft}s</div>
        </div>
      </div>

      <div className="problem-card">
        <div className="problem">
          <span className="number">{problem.num1}</span>
          <span className="operator">{problem.operator}</span>
          <span className="number">{problem.num2}</span>
          <span className="operator">=</span>
        </div>

        <input
          ref={inputRef}
          type="number"
          value={answer}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer"
          autoFocus
          disabled={isFinished}
          className="answer-input"
        />
      </div>

      <button onClick={goHome} className="back-btn">
        ← End Practice
      </button>
    </main>
  );
}
