import { useState } from 'react';

const CountApp: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handlePlus = () => {
    setCount((prev) => prev + 1);
  };

  const handleMinus = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div>
      <h1>カウント：{count}</h1>
      <button onClick={handlePlus}>プラス</button>
      <button onClick={handleMinus}>マイナス</button>
    </div>
  );
};

export default CountApp;
