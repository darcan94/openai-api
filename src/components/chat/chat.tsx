'use client';
import { useChat } from "ai/react";
import ChatList from "@/components/chatList/chatList";
import { useAutoScroll, useScrollDetection, useScrollToBottom } from "@/hooks/useAutoScroll";
import PromptForm from "@/components/promptForm/promptForm";
import Button from "@/components/button/Button";
import { IconArrowDown } from "@/components/icons/Icons";

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
    const scrollToBottom = useScrollToBottom(chatListRef);
    const isAtBottom = useScrollDetection({ chatListRef });

    return (
         <>    
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
            {!isAtBottom && (
                <Button
                    variant="outline"
                    className="fixed bottom-6 right-8
                    rounded-full h-10 w-10 px-0 py-0"
                    onClick={scrollToBottom}>
                        <IconArrowDown />
                </Button>
            )}            
        </>
    )
}