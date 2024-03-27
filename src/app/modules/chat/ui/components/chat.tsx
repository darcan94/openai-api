"use client";
import { useChat } from "ai/react";
import ChatList from "@/app/modules/chat/ui/components/chatList";
import PromptForm from "@/app/components/promptForm/promptForm";
import { Message } from "ai";
import EmptyChat from "./EmptyChat";
import { useRouter } from "next/navigation";
import DropDown from "@/app/components/dropDown/dropDown";
import { useState } from "react";

interface ChatProps{
  id: string;
  initialMessages?: Message[]; 
}

export default function Chat({ id, initialMessages }: ChatProps) {
  const router = useRouter();
  const [ selectedModel, setSelectedModel ] = useState('');
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
    api: selectedModel,
    onFinish: () => {
      router.push(`/chat/${id}`);
    },
  });

  const handleModelSelect = (path: string) => {
    console.log(`/api/${path}`);    
    setSelectedModel(`/api/${path}`);
  }

  return (
    <div className="animate-in w-full pl-0 duration-300 ease-in-out">
      <div className="fixed top-0 z-10">
        <DropDown onSelect = { handleModelSelect } />
      </div>
      <div className="h-full block">
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
