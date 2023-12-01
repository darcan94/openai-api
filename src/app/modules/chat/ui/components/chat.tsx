"use client";
import { useChat } from "ai/react";
import ChatList from "@/app/modules/chat/ui/components/chatList";
import {
  useAutoScroll,
  useScrollDetection,
  useScrollToBottom,
} from "@/app/hooks/useScroll";
import PromptForm from "@/app/components/promptForm/promptForm";
import { Button } from "@/app/components/ui/button/Button";
import { IconArrowDown } from "@/app/components/ui/icons/Icons";
import { Message } from "ai";
import EmptyChat from "./EmptyChat";

export const initialPrompt: Message[] = [
  {
    id: new Date().toISOString(),
    role: "system",
    content:
      "You are a helpful assistant. Answer as concisely as possible. Markdown",
  },
];

export default function Chat({
  id,
  initialMessages = initialPrompt,
}: {
  id: string;
  initialMessages?: Message[];
}) {
  const {
    messages,
    input,
    isLoading,
    setInput,
    setMessages,
    stop,
    reload,
    handleInputChange,
    handleSubmit,
  } = useChat({ initialMessages, body: { id } });

  const chatListRef = useAutoScroll(messages);
  const scrollToBottom = useScrollToBottom(chatListRef);
  const isAtBottom = useScrollDetection(chatListRef);

  return (
    <div className="relative flex w-full flex-col justify-end">
      <div ref={chatListRef} className="overflow-y-auto">
        {messages.length > 1 ? (
          <ChatList messages={messages} />
        ) : (
          <EmptyChat setInput={setInput} />
        )}

        <PromptForm
          input={input}
          isLoading={isLoading}
          setMessages={setMessages}
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