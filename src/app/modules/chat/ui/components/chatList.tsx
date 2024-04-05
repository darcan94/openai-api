import { Button } from "@/app/components/ui/Button";
import { IconArrowDown } from "@/app/components/ui/Icons";
import Bubble from "@/app/components/ui/bubble";
import { useAutoScroll, useScrollDetection, useScrollToBottom } from "@/app/hooks/useScroll";
import { type Message } from "ai";

export default function ChatList({ messages }: { messages: Message[] }) {
  /*const filteredMessages = messages.filter(
    (message: Message) => message?.role !== "system",
  );*/
  const chatListRef = useAutoScroll(messages);
  const isAtBottom = useScrollDetection(chatListRef);
  const scrollToBottom = useScrollToBottom(chatListRef);

  return (
    <div  ref={chatListRef} className="flex w-full h-auto flex-col gap-4 px-2 pt-4 pb-4 overflow-y-auto">
      {messages.map((message: Message, index: number) => (
        <Bubble key={index} message={message} />
      ))}
      {!isAtBottom && (
        <Button
          variant="rounded"
          className="absolute bottom-28 right-6 z-10 
                     bg-secondary px-0 py-0 dark:border-none"
          size="iconlg"
          onClick={scrollToBottom}
        >
          <IconArrowDown />
        </Button>
      )}
    </div>
  );
}
