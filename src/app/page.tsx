import Link from "next/link";

export default function MainPage() {
  return (
    <div>
      <h1>OpenAi Chat</h1>
      <Link href={"/chat"}>Chat App</Link>
    </div>
  );
}
