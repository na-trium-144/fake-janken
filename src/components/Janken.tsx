import React from "react";

type Props = {
  onUserChoice: (choice: string) => void;
};

const Janken: React.FC<Props> = ({ onUserChoice }) => {
  const choices = ["グー", "チョキ", "パー"];

  return (
    <div className="janken-container">
      {choices.map((choice) => (
        <button key={choice} onClick={() => onUserChoice(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default Janken;
