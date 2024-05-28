"use client";
import { useChat } from "ai/react";
import ChatList from "@/app/modules/chat/ui/chatList";
import PromptForm from "@/components/promptForm";
import { Message } from "ai";
import EmptyChat from "./EmptyChat";
import {usePathname, useRouter} from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";
import {Session} from "next-auth";

const LOCAL_STORAGE_KEY = "modelSelected";
interface ChatProps{
  id: string;
  initialMessages?: Message[];
  session: Session | null;
}

export default function Chat({ id, initialMessages, session }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [
      selectedModel
  ] = useLocalStorage(LOCAL_STORAGE_KEY, { model: "gpt-3.5", path: "chat" });

  const {
    messages,
    input,
    isLoading,
    setInput,
    stop,
    reload,
    append
  } = useChat({
    initialMessages,
    body: { id, userId: session?.user?.id },
    api: `/api/${selectedModel.path}`,
    onFinish: () => {
      if(!path.includes(id)) {
        router.push(`/chat/${id}`);
        router.refresh();
      }
    }
  });

  return (
    <div className="animate-in w-full h-full overflow-hidden duration-300 ease-in-out">      
      <div className="h-full">
        {messages.length > 0 
           ? <ChatList messages={messages} />
           : <EmptyChat setInput={setInput} session={session} />
        }

        <PromptForm
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          hasMessage={messages.length > 1}
          stop={stop}
          reload={reload}
          onSubmit={
            async (value: string) => {
              await append({
                content: value,
                role: 'user'
            })
          }}
        />
      </div>
    </div>
  );
}
