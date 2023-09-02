'use client';
import { useChat } from "ai/react";
import ChatList from "@/components/chatList/chatList";
import useAutoScroll from "@/hooks/useAutoScroll";
import PromptForm from "@/components/promptForm/promptForm";

export default function Chat(){
    const { messages, input, isLoading, stop, reload, handleInputChange, handleSubmit } = useChat({
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
            <PromptForm
                input = {input}
                isLoading = {isLoading}
                hasMessage = {messages.length>1}
                stop={stop}
                reload={reload}
                handleInputChange = {handleInputChange}
                handleSubmit = {handleSubmit}
            />
        </div>
    )
}