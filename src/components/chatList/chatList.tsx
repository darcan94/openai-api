import Bubble from "@/components/bubble/bubble";
import { type Message } from "ai";

export default function ChatList({ messages }: { messages: Message[] }) {
  const filteredMessages = messages.filter(
    (message: Message) => message?.role !== "system",
  );

  return (
    <div className="flex w-full flex-col gap-4 px-2">
      {filteredMessages.map((message: Message, index: number) => (
        <Bubble key={index} message={message} />
      ))}
    </div>
  );
}
