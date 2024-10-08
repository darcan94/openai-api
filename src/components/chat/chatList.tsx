import Button from "@/components/ui/Button";
import { IconArrowDown } from "@/components/ui/Icons";
import Bubble from "@/components/ui/bubble";
import { useAutoScroll, useScrollDetection, useScrollToBottom } from "@/hooks/useScroll";
import { type Message } from "ai";
import { useEffect } from "react";

export default function ChatList({ messages }: { messages: Message[] }) {
  const chatListRef = useAutoScroll(messages);
  const isAtBottom = useScrollDetection(chatListRef);
  const scrollToBottom = useScrollToBottom(chatListRef);

  useEffect(() => {
    const ref = chatListRef.current;
    ref?.scrollTo({top: ref.scrollHeight})
  })

  return (
    <div ref={chatListRef} className="flex xl:w-9/12 mx-auto h-full flex-col gap-4 px-2 pt-10 pb-24 overflow-y-auto overflow-x-hidden">

      { messages.map((message, index) => <Bubble key={index} message={message} /> )}
      
      {!isAtBottom && (
        <Button
          variant="rounded"
          className="absolute p-2 bottom-28 right-6 z-10 pointer bg-secondary"
          size="iconlg"
          onClick={scrollToBottom}
        >
          <IconArrowDown />
          <span className="sr-only">Go to bottom page</span>
        </Button>
      )}
    </div>
  );
}