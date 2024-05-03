"use client";
import { useChat } from "ai/react";
import ChatList from "@/app/modules/chat/ui/components/chatList";
import PromptForm from "@/components/promptForm/promptForm";
import { Message } from "ai";
import EmptyChat from "./EmptyChat";
import {usePathname, useRouter} from "next/navigation";
import DropDown from "@/components/dropDown/dropDown";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";

const LOCAL_STORAGE_KEY = "modelSelected";
interface ChatProps{
  id: string;
  initialMessages?: Message[]; 
}

export default function Chat({ id, initialMessages }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [ selectedModel, setSelectedModel ] = useLocalStorage(LOCAL_STORAGE_KEY, { model: "gpt-3.5", path: "chat" });
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
    body: { id },
    api: `/api/${selectedModel.path}`,
    onFinish: () => {
      if(!path.includes(id)) {
        router.push(`/chat/${id}`);
        router.refresh();
      }
    }
  });

  const handleModelSelect = (model: { model: string, path: string}) => {
    setSelectedModel(model);
  }

  return (
    <div className="animate-in w-full h-full overflow-hidden duration-300 ease-in-out">
      <div className="fixed top-0 z-10">
        <DropDown onSelect = { handleModelSelect } selectedModel = { selectedModel} />
      </div>
      <div className="h-full">
        {messages.length > 0 ? (
          <ChatList messages={messages} />
        ) : (
          <EmptyChat setInput={setInput} />
        )}

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
