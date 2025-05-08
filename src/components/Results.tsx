import React from "react";

type Props = {
  userChoice: string | null;
  opponentChoice: string | null;
  result: string;
  onReset: () => void;
};

const Result: React.FC<Props> = ({ userChoice, opponentChoice, result, onReset }) => {
  return (
    <div className="result-container">
      <p>あなたの手: {userChoice ?? "未選択"}</p>
      <p>相手の手: {opponentChoice ?? "未選択"}</p>
      <p>結果: {result}</p>
      <button onClick={onReset}>もう一度</button>
    </div>
  );
};

export default Result;
