import { useState, useEffect } from "react";
import "./index.css";
import Matchmaking from "./components/Matchmaking";
import Janken from "./components/Janken";
import Waiting from "./components/Waiting";
import Result from "./components/Results";
import InputName from "./components/InputName";
import ShowPlayerName from "./components/ShowName";

const GameState = {
  WAITING: "WAITING",
  PLAYING: "PLAYING",
  WAITING_FOR_OPPONENT: "WAITING_FOR_OPPONENT",
  RESULT: "RESULT",
} as const;

type GameState = (typeof GameState)[keyof typeof GameState];

export default function App() {
  const [playerName, setPlayerName] = useState<string>();
  const [playerRanking, setPlayerRanking] = useState<number>();
  useEffect(() => {
    setPlayerName(localStorage.getItem("playerName") || "");
    const playerRanking = Number(
      localStorage.getItem("playerRanking") || 15000 + 5000 * Math.random(),
    );
    setPlayerRanking(playerRanking);
    localStorage.setItem("playerRanking", playerRanking.toString());
  }, []);

  const [gameState, setGameState] = useState<GameState>(GameState.WAITING);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (gameState === GameState.WAITING && playerName) {
      setTimeout(() => {
        setGameState(GameState.PLAYING);
      }, 2000);
    }
  }, [gameState, playerName]);

  const handleUserChoice = (choice: string) => {
    setUserChoice(choice);
    setGameState(GameState.WAITING_FOR_OPPONENT);

    // 模擬的に2秒後に相手の選択が完了する
    setTimeout(() => {
      const choices = ["グー", "チョキ", "パー"];
      const playerChoiceIndex = choices.indexOf(choice);
      const random = Math.random();
      let opponent: string;
      if (random < 0.6) {
        opponent = choices[(playerChoiceIndex + 1) % 3]; // プレイヤーの勝ち
      } else if (random < 0.8) {
        opponent = choices[playerChoiceIndex]; // 引き分け
      } else {
        opponent = choices[(playerChoiceIndex + 2) % 3]; // プレイヤーの負け
      }

      setOpponentChoice(opponent);
      determineWinner(choice, opponent);
      setGameState(GameState.RESULT);
    }, 2000);
  };

  const determineWinner = (user: string, opponent: string) => {
    let newRanking: number;
    if (user === opponent) {
      setResult("引き分け");
      newRanking = playerRanking! * (1 - 0.2 * Math.random());
    } else if (
      (user === "グー" && opponent === "チョキ") ||
      (user === "チョキ" && opponent === "パー") ||
      (user === "パー" && opponent === "グー")
    ) {
      setResult("あなたの勝ち！");
      newRanking = playerRanking! * (1 - 0.2 * Math.random());
    } else {
      setResult("あなたの負け...");
      newRanking = playerRanking! * (1 + 0.1 * Math.random());
    }
    setPlayerRanking(newRanking);
    localStorage.setItem("playerRanking", newRanking.toString());
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

      {playerName === undefined ? null : !playerName ? (
        <InputName
          setPlayerName={(n: string) => {
            setPlayerName(n);
            localStorage.setItem("playerName", n);
          }}
        />
      ) : (
        <>
          <ShowPlayerName
            playerName={playerName}
            playerRanking={playerRanking!}
          />

          {gameState === GameState.WAITING && <Matchmaking />}

          {gameState === GameState.PLAYING && (
            <>
              <p>マッチングしました！</p>
              <Janken onUserChoice={handleUserChoice} />
            </>
          )}

          {gameState === GameState.WAITING_FOR_OPPONENT && (
            <Waiting userChoice={userChoice!} />
          )}

          {gameState === GameState.RESULT && (
            <Result
              userChoice={userChoice}
              opponentChoice={opponentChoice}
              result={result}
              onReset={resetGame}
            />
          )}
        </>
      )}
    </div>
  );
}
