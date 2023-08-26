import Bubble from "@/components/bubble/bubble";
import { type Message } from "ai";

export default function ChatList({ messages }: {messages: Message[]}){
    const filteredMessages = messages.filter((message: Message) => message?.role !== 'system');

    return(
        <div className="flex flex-col w-full gap-4">
            { filteredMessages.map((message: Message) => ( 
                 <Bubble key={message.id} message={message} /> 
            )) }
        </div>
    )
}