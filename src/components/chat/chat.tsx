"use client";
import { useChat } from "ai/react";
import ChatList from "@/components/chat/chatList";
import PromptForm from "@/components/promptForm";
import EmptyChat from "./EmptyChat";
import {usePathname, useRouter} from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { useEffect, useRef } from "react";
import {Session} from "next-auth";
import { useConfig } from "@/components/modelConfig";
import type { Chat } from "@/app/modules/chat/domain/Chat";

interface Props{
  id: string;
  chat?: Chat;
  session: Session | null;
}

export default function Chat({ id, chat, session }: Props) {
  const router = useRouter();
  const path = usePathname();
  const { config, setConfig, resetToDefault } = useConfig();
  const [ selectedModel ] = useLocalStorage('model');
  const isInitialMount = useRef(true);

  useEffect(() => {    
    if(isInitialMount.current){
      isInitialMount.current = false;
      if(chat?.config) {
        setConfig(chat.config);     
      }
      else {
        resetToDefault();      
      }
    }      
  }, [chat, setConfig, resetToDefault])

  const {
    messages,
    input,
    isLoading,
    setInput,
    stop,
    reload,
    handleInputChange,
    handleSubmit,
  } = useChat({
    initialMessages: chat?.messages,
    body: { id, userId: session?.user?.id, config },
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

        {
          messages.length
           ? <ChatList messages={messages} />
           : <EmptyChat setInput={setInput} session={session} />
        }

        <PromptForm
          input={input}
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
