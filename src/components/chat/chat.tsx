'use client';
import { useChat } from "ai/react";
import PromptField from "../promptField/promptField";
import ChatList from "../chatList/chatList";

export default function Chat(){
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        initialMessages: [{
          id: new Date().toISOString(),
          role: 'system',
          content: 'You are a helpful assistant.'
        }]
    });

    return (
        <>
            <ChatList messages={messages}/>
            <PromptField
                input = {input}
                handleInputChange = {handleInputChange}
                handleSubmit = {handleSubmit} 
            />
        </>
    )
}