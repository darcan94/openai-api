'use client';
import { useChat } from "ai/react";
import PromptField from "../promptField/promptField";
import ChatList from "../chatList/chatList";
import useAutoScroll from "@/app/hooks/useAutoScroll";

export default function Chat(){
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        initialMessages: [{
          id: new Date().toISOString(),
          role: 'system',
          content: 'You are a helpful assistant.'
        }]
    });

    const chatListRef = useAutoScroll(messages);

    return (
        <div ref={chatListRef} className="w-full overflow-y-scroll px-2">
            <ChatList messages={messages}/>
            <PromptField
                input = {input}
                handleInputChange = {handleInputChange}
                handleSubmit = {handleSubmit} 
            />
        </div>
    )
}