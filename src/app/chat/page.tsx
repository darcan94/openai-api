import Chat from "@/app/modules/chat/ui/components/chat";
import { Metadata } from "next";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata ={
  title: 'Chat'
}

export default function Home() {
  const chatId = uuidv4();

  return <Chat id={chatId} />;
}
