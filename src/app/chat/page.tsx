import Chat from "@/app/modules/chat/ui/components/chat";
import { Metadata } from "next";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
  title: "Chat",
};

export default function Page() {
  const chatId = uuidv4();

  return (
    <main className="w-full">
        <Chat id={chatId} />
    </main>
)}
