import Chat from "@/app/modules/chat/ui/components/chat";
import { Metadata } from "next";
import { nanoid } from "nanoid";

export const metadata: Metadata = {
  title: "Chat",
};

export default function Page() {
  const chatId = nanoid(7);

  return (
    <main className="w-full">
        <Chat id={chatId} />
    </main>
)}
