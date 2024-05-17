import Chat from "@/app/modules/chat/ui/chat";
import { notFound } from "next/navigation";
import { getChat } from "@/app/modules/chat/application/actions";
import { Session } from "next-auth";
import { auth } from "@/auth";

export default async function ChatPage({ params }: { params: any }) {
  const session: Session | null = await auth();
  const chat = await getChat(params.id, session?.user?.id || "");

  if (!chat) {
    notFound();
  }

  return (
      <main className="w-full h-full">
        <Chat id={chat.id} initialMessages={chat.messages} session={null}/>
      </main>  
    );
}
