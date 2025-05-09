import React from "react";

const Waiting: React.FC<{ userChoice: string }> = ({ userChoice }) => {
  return (
    <div className="result-container">
      <p>あなたの手: {userChoice ?? "未選択"}</p>
      <p>相手の行動を待っています...</p>
    </div>
  );
};

export default Waiting;
