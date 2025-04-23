import React, { useState, useEffect } from 'react';
import { BiAdjust } from "react-icons/bi";
import './App.css';

function App() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [activeInput, setActiveInput] = useState("first");
  const [result, setResult] = useState(0);
  const [history, setHistory] = useState([]);
  const [operator, setOperator] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("calc-history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("calc-history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        calculate();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [firstNum, secondNum, operator]);
  

  const isValidInput = () => {
    return (
      !isNaN(firstNum) &&
      !isNaN(secondNum) &&
      firstNum.trim() !== "" &&
      secondNum.trim() !== ""
    );
  };

  const calculate = (op = operator) => {
    if (!op) {
      setResult("Choose operator");
      return;
    }

    if (!isValidInput()) {
      setResult("Invalid input");
      return;
    }

    const num1 = parseFloat(firstNum);
    const num2 = parseFloat(secondNum);

    let res;
    switch (op) {
      case "+": res = num1 + num2; break;
      case "-": res = num1 - num2; break;
      case "*": res = num1 * num2; break;
      case "/": res = num2 === 0 ? "Cannot divide by 0" : num1 / num2; break;
      default: res = "Invalid operator";
    }

    const record = `${num1} ${op} ${num2} = ${res}`;
    setResult(res);
    setHistory([record, ...history]);
    setFirstNum(res.toString());
    setSecondNum("");
    setActiveInput("first");
    setOperator("");
  };

  const clearAll = () => {
    setFirstNum("");
    setSecondNum("");
    setResult(0);
    setHistory([]);
    setOperator("");
    localStorage.removeItem("calc-history");
  };

  const handleDigit = (digit) => {
    if (activeInput === "first") {
      setFirstNum((prev) => prev + digit);
    } else {
      setSecondNum((prev) => prev + digit);
    }
  };

  const handleBackspace = () => {
    if (activeInput === "first") {
      setFirstNum((prev) => prev.slice(0, -1));
    } else {
      setSecondNum((prev) => prev.slice(0, -1));
    }
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleOperator = (op) => {
    setOperator(op);
    setActiveInput("second");
  };

  const isDark = theme === "dark";

  return (
    <div className={isDark ? "app dark" : "app"}>
      <button onClick={handleThemeToggle} style={{ marginBottom: "80px" }}>
      <BiAdjust />
      </button>

      <div>
        <input
          type="text"
          value={firstNum}
          onChange={(e) => setFirstNum(e.target.value)}
          placeholder="First number"
          onFocus={() => setActiveInput("first")}
        />
        <input
          type="text"
          value={secondNum}
          onChange={(e) => setSecondNum(e.target.value)}
          placeholder="Second number"
          onFocus={() => setActiveInput("second")}
        />
      </div>

      <div style={{ margin: "20px 0" }}>
        <button onClick={() => handleOperator("+")}>+</button>
        <button onClick={() => handleOperator("-")}>-</button>
        <button onClick={() => handleOperator("*")}>*</button>
        <button onClick={() => handleOperator("/")}>/</button>
        <button onClick={clearAll}>Clear</button>
      </div>

      <h1>{result}</h1>

      <div>
        <h2 style={{ marginBottom: "20px" }}>Keypad</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 50px)", gap: "20px", justifyContent: "center" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button key={num} onClick={() => handleDigit(num.toString())}>{num}</button>
          ))}
          <button onClick={() => handleDigit(".")}>.</button>
          <button onClick={handleBackspace}>←</button>
          <button onClick={() => calculate() }>=</button>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>History</h2>
        {history.length === 0 ? (
          <p>No calculations yet</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {history.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
