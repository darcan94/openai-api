'use client';
import { useChat } from "ai/react";
import PromptField from "@/components/promptField/promptForm";
import ChatList from "@/components/chatList/chatList";
import useAutoScroll from "@/app/hooks/useAutoScroll";

export default function Chat(){
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        initialMessages: [{
          id: new Date().toISOString(),
          role: 'system',
          content: 'You are a helpful assistant. Answer as concisely as possible.'
        }]
    });

    const chatListRef = useAutoScroll(messages);

    return (
        <div ref={chatListRef} className="w-full overflow-y-auto px-2">
            <ChatList messages={messages}/>
            <PromptField
                input = {input}
                handleInputChange = {handleInputChange}
                handleSubmit = {handleSubmit} 
            />
        </div>
    )
}