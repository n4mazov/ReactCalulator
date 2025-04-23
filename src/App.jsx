import React, { useState } from 'react';
import './App.css';

function App() {
  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [result, setResult] = useState(0);

  const sum = () => {
    const res = Number(firstNum) + Number(secondNum);
    setResult(res);
    setFirstNum("");
    setSecondNum("");
  };

  const minus = () => {
    const res = Number(firstNum) - Number(secondNum);
    setResult(res);
    setFirstNum("");
    setSecondNum("");
  };

  const multiply = () => {
    const res = Number(firstNum) * Number(secondNum);
    setResult(res);
    setFirstNum("");
    setSecondNum("");
  };

  const divide = () => {
    if (Number(secondNum) === 0) {
      setResult("Cannot divide by 0");
    } else {
      const res = Number(firstNum) / Number(secondNum);
      setResult(res);
    }
    setFirstNum("");
    setSecondNum("");
  };

  return (
    <div>
      <input
        type="text"
        value={firstNum}
        onChange={(e) => setFirstNum(e.target.value)}
        placeholder="First number"
      />
      <input
        type="text"
        value={secondNum}
        onChange={(e) => setSecondNum(e.target.value)}
        placeholder="Second number"
      />
      <div className='buttons'>
      <button onClick={sum}>+</button>
      <button onClick={minus}>-</button>
      <button onClick={multiply}>*</button>
      <button onClick={divide}>/</button>
      </div>
      <h1>{result}</h1>
    </div>
  );
}

export default App;
