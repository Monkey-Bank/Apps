import React, { useState } from 'react';

const Calculator = () => {
  const [expression, setExpression] = useState<string>(''); // 入力式
  const [result, setResult] = useState<string>('0'); // 結果

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value;
    setExpression((prev) => prev + value);
  };

  const handleEqual = () => {
    try {
      const evalResult = Function(
        '"use strict"; return (' +
          expression.replace(/×/g, '*').replace(/÷/g, '/') +
          ')'
      )();
      setResult(String(evalResult));
    } catch (err) {
      setResult('Error');
    }
  };

  const handleCancel = () => {
    setExpression('');
    setResult('0');
  };

  return (
    <div>
      <div>
        <p>式: {expression}</p>
        <p>結果: {result}</p>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button key={num} value={num} onClick={handleClick}>
              {num}
            </button>
          ))}
        </div>
        <div>
          {['+', '-', '×', '÷'].map((op) => (
            <button key={op} value={op} onClick={handleClick}>
              {op}
            </button>
          ))}
        </div>
        <button onClick={handleEqual}>=</button>
        <button onClick={handleCancel}>C</button>
      </div>
    </div>
  );
};

export default Calculator;
