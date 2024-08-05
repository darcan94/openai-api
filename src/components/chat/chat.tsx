"use client";
import { useChat } from "ai/react";
import ChatList from "@/components/chat/chatList";
import PromptForm from "@/components/promptForm";
import { Message } from "ai";
import EmptyChat from "./EmptyChat";
import {usePathname, useRouter} from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";
import {Session} from "next-auth";
import { useConfig } from "../modelConfig";
import { Chat } from "@/app/modules/chat/domain/Chat";

interface ChatProps{
  id: string;
  chat?: Chat;
  session: Session | null;
}

export default function Chat({ id, chat, session }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const { config } = useConfig();
  const [
      selectedModel
  ] = useLocalStorage('model', { label: 'gpt-4o', value: 'chat' });

  const {
    messages,
    input,
    isLoading,
    setInput,
    stop,
    reload,
    //append,
    handleInputChange,
    handleSubmit,
  } = useChat({
    initialMessages: chat?.messages,
    body: { 
      id, 
      userId: session?.user?.id,
      config: chat?.config || config
    },
    api: `/api/${selectedModel.value}`,
    sendExtraMessageFields: true,
    onFinish: () => {
      if(!path.includes(id)) {
        router.push(`/chat/${id}`);
        router.refresh();
      }
    }
  });

  return (
    <div className="h-full overflow-hidden">      
      <div className="h-full">
        {messages.length
           ? <ChatList messages={messages} />
           : <EmptyChat setInput={setInput} session={session} />
        }
        {selectedModel.label}
        <PromptForm
          input={input}
          //setInput={setInput}
          isLoading={isLoading}
          hasMessage={messages.length > 0}
          stop={stop}
          reload={reload}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
