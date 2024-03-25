"use client";
import { useChat } from "ai/react";
import ChatList from "@/app/modules/chat/ui/components/chatList";
import PromptForm from "@/app/components/promptForm/promptForm";
import { Message } from "ai";
import EmptyChat from "./EmptyChat";
import { useRouter } from "next/navigation";
import { MemoizedDropDown } from "@/app/components/dropDown/dropDown";
import { useState } from "react";

interface ChatProps{
  id: string;
  initialMessages?: Message[]; 
}

export default function Chat({ id, initialMessages }: ChatProps) {
  const router = useRouter();
  const [ selectedModel, setSelectedModel ] = useState({ model: "gpt-3.5", path: "chat" });
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
    initialMessages,
    body: { id },
    api: `/api/${selectedModel.path}`,
    onFinish: () => {
      router.push(`/chat/${id}`);
    },
  });

  const handleModelSelect = (model: { model: string, path: string}) => {
    setSelectedModel(model);
  }

  return (
    <div className="animate-in w-full pl-0 duration-300 ease-in-out">
      <div className="fixed top-0 z-10 bg-background-alpha w-full">
        <MemoizedDropDown onSelect = { handleModelSelect } selectedModel = { selectedModel} />
      </div>
      <div className="h-full flex flex-col justify-end">
        {messages.length > 0 ? (
          <ChatList messages={messages} />
        ) : (
          <EmptyChat setInput={setInput} />
        )}

        <PromptForm
          input={input}
          isLoading={isLoading}
          hasMessage={messages.length > 1}
          stop={stop}
          reload={reload}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
