import { useState, useEffect } from "react";
import "./index.css";
import Matchmaking from "./components/Matchmaking";
import Janken from "./components/Janken";
import Result from "./components/Results";
enum GameState {
  WAITING,
  MATCHED,
  PLAYING,
  RESULT,
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.WAITING);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (gameState === GameState.WAITING) {
      // 模擬的に2秒後にマッチング成功とする
      setTimeout(() => {
        setGameState(GameState.MATCHED);
      }, 2000);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState(GameState.PLAYING);
  };

  const handleUserChoice = (choice: string) => {
    const choices = ["グー", "チョキ", "パー"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const opponent = choices[randomIndex];

    setUserChoice(choice);
    setOpponentChoice(opponent);
    determineWinner(choice, opponent);
    setGameState(GameState.RESULT);
  };

  const determineWinner = (user: string, opponent: string) => {
    if (user === opponent) {
      setResult("引き分け");
    } else if (
      (user === "グー" && opponent === "チョキ") ||
      (user === "チョキ" && opponent === "パー") ||
      (user === "パー" && opponent === "グー")
    ) {
      setResult("あなたの勝ち！");
    } else {
      setResult("あなたの負け...");
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setOpponentChoice(null);
    setResult("");
    setGameState(GameState.WAITING);
  };

  return (
    <div className="container">
      <h1>オンラインじゃんけん</h1>
      {gameState === GameState.WAITING && <Matchmaking />}
      {gameState === GameState.MATCHED && (
        <div>
          <p>マッチングしました！</p>
          <button onClick={startGame}>じゃんけん開始！</button>
        </div>
      )}
      {gameState === GameState.PLAYING && (
        <Janken onUserChoice={handleUserChoice} />
      )}
      {gameState === GameState.RESULT && (
        <Result
          userChoice={userChoice}
          opponentChoice={opponentChoice}
          result={result}
          onReset={resetGame}
        />
      )}
    </div>
  );
}
