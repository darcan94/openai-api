import Chat from "@/app/modules/chat/ui/chat";
import { Metadata } from "next";
import { nanoid } from "nanoid";
import {Session} from "next-auth";
import {auth} from "@/auth";

export const metadata: Metadata = {
  title: "Chat",
};

export default async function Page() {
  const chatId = nanoid(7);
  const session: Session | null = await auth();
  
  return <Chat id={chatId} session={session}/>
}
