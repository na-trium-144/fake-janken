export default function ShowPlayerName(props: {
  playerName: string;
  playerRanking: number;
}) {
  return (
    <>
      <h3>あなたの名前: {props.playerName}</h3>
      <h3>世界ランキング: {Math.floor(props.playerRanking)} 位</h3>
    </>
  );
}