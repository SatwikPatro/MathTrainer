import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home({ darkMode }) {
  const navigate = useNavigate();
  const [selectedOp, setSelectedOp] = useState("");
  const [selectedDiff, setSelectedDiff] = useState("");

  const operators = [
    { value: "+", label: "Addition (+)" },
    { value: "-", label: "Subtraction (−)" },
    { value: "×", label: "Multiplication (×)" },
    { value: "÷", label: "Division (÷)" },
    { value: "random", label: "Random", highlight: true },
  ];

  const difficulties = ["easy", "medium", "hard", "super hard"];

  const handleStart = () => {
    if (selectedOp && selectedDiff) {
      navigate("/practice", {
        state: {
          operator: selectedOp,
          difficulty: selectedDiff,
        },
      });
    }
  };

  return (
    <main className="home">
      <div className="section">
        <h2 className="section-title">Choose Operator</h2>
        <div className="button-grid">
          {operators.map((op) => (
            <button
              key={op.value}
              onClick={() => setSelectedOp(op.value)}
              className={`option-btn ${
                selectedOp === op.value ? "selected" : ""
              } ${op.highlight ? "highlight" : ""}`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Choose Difficulty</h2>
        <div className="button-grid">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDiff(diff)}
              className={`option-btn ${
                selectedDiff === diff ? "selected" : ""
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        disabled={!selectedOp || !selectedDiff}
        className="start-btn"
      >
        START PRACTICE
      </button>
    </main>
  );
}
