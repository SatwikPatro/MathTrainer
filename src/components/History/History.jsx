import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./History.css";

export default function History({ darkMode }) {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem("mathTrainerHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const goHome = () => {
    navigate("/");
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      localStorage.removeItem("mathTrainerHistory");
      setHistory([]);
    }
  };

  const getOperatorLabel = (operator) => {
    const labels = {
      "+": "Addition",
      "-": "Subtraction",
      "×": "Multiplication",
      "÷": "Division",
      random: "Random",
    };
    return labels[operator] || operator;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <main className="history">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h2 className="empty-title">No Math Runs Done Yet</h2>
          <p className="empty-description">
            Complete a practice session to see your history here!
          </p>
          <button onClick={goHome} className="home-btn">
            Go to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="history">
      <div className="history-header">
        <h1 className="history-title">Practice History</h1>
        <div className="history-actions">
          <button onClick={clearHistory} className="clear-btn">
            Clear History
          </button>
          <button onClick={goHome} className="home-btn">
            ← Home
          </button>
        </div>
      </div>

      <div className="history-stats">
        <div className="stat-card">
          <div className="stat-value">{history.length}</div>
          <div className="stat-label">Total Runs</div>
        </div>
        <div className="stat-card best-score-card">
          <div className="stat-value">
            {Math.max(...history.map((run) => run.score))}
          </div>
          <div className="stat-label">Best Score</div>
          <div className="best-score-meta">
            <span className="best-score-detail">
              {getOperatorLabel(
                history.find(
                  (run) =>
                    run.score === Math.max(...history.map((r) => r.score))
                ).operator
              )}
            </span>
            <span className="best-score-separator">•</span>
            <span className="best-score-detail">
              {
                history.find(
                  (run) =>
                    run.score === Math.max(...history.map((r) => r.score))
                ).difficulty
              }
            </span>
          </div>
        </div>
      </div>

      <div className="history-list">
        {history
          .slice()
          .reverse()
          .map((run, index) => (
            <div key={run.timestamp} className="history-card">
              <div className="history-card-header">
                <div className="run-number">Run #{history.length - index}</div>
                <div className="run-date">{formatDate(run.timestamp)}</div>
              </div>

              <div className="history-card-content">
                <div className="history-detail">
                  <span className="detail-label">Operation:</span>
                  <span className="detail-value operator-badge">
                    {getOperatorLabel(run.operator)}
                  </span>
                </div>

                <div className="history-detail">
                  <span className="detail-label">Difficulty:</span>
                  <span
                    className={`detail-value difficulty-badge ${run.difficulty.replace(
                      " ",
                      "-"
                    )}`}
                  >
                    {run.difficulty}
                  </span>
                </div>

                <div className="history-detail">
                  <span className="detail-label">Score:</span>
                  <span className="detail-value score-value">{run.score}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
