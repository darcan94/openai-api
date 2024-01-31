"use client";
import { useChat } from "ai/react";
import ChatList from "@/app/modules/chat/ui/components/chatList";
import {
  useAutoScroll,
  useScrollDetection,
  useScrollToBottom,
} from "@/app/hooks/useScroll";
import PromptForm from "@/app/components/promptForm/promptForm";
import { Button } from "@/app/components/ui/Button";
import { IconArrowDown } from "@/app/components/ui/Icons";
import { Message } from "ai";
import EmptyChat from "./EmptyChat";
import { useRouter } from "next/navigation";

export default function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages?: Message[];
}) {
  const router = useRouter();
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
    api: '/api/chatGemini' ,
    onFinish: () => {
      router.push(`/chat/${id}`);
    }
  });

  const chatListRef = useAutoScroll(messages);
  const scrollToBottom = useScrollToBottom(chatListRef);
  const isAtBottom = useScrollDetection(chatListRef);

  return (
    <div className="pl-0 group relative flex w-full flex-col justify-end animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[350px]">
      <div ref={chatListRef} className="overflow-y-auto">
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
      {!isAtBottom && (
        <Button
          variant="rounded"
          className="absolute bottom-36 right-6 z-10 
                    rounded-full bg-secondary px-0 py-0 dark:border-none"
          size="iconlg"
          onClick={scrollToBottom}
        >
          <IconArrowDown />
        </Button>
      )}
    </div>
  );
}
