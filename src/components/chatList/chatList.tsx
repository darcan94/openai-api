import Bubble from "../bubble/bubble";
import { type Message } from "ai";

export default function ChatList({ messages }: {messages: Message[]}){    
    return(
        <div>
            {   messages
                    .filter((message: Message) => message.role !== 'system')   
                    .map((message: Message) => ( <Bubble key={message.id} message={message} /> ))
            }
        </div>
    )
}