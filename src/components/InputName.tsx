import { useState } from "react";

export default function InputName(props: {
  setPlayerName: (n: string) => void;
}) {
  const [name, setName] = useState<string>("");

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.setPlayerName(name);
      }}
    >
      <h3>あなたの名前を入力してください</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
        style={{ fontSize: 20 }}
      />
      <button type="submit" style={{ marginLeft: 8, fontSize: 20 }}>
        登録！
      </button>
    </form>
  );
}
