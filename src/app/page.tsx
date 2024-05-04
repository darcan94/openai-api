import Link from "next/link";

export default function MainPage() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <h1>ChatBot  AI with Vercel AI SDK</h1>
        <h2>
            <Link href={"/chat"}>Chat App</Link>
        </h2>
    </main>
  );
}
