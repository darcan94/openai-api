'use client';
import { useChat } from "ai/react";
import ChatList from "@/components/chatList/chatList";
import { useAutoScroll, useScrollDetection, useScrollToBottom } from "@/hooks/useScroll";
import PromptForm from "@/components/promptForm/promptForm";
import Button from "@/components/button/Button";
import { IconArrowDown } from "@/components/icons/Icons";
import { Message } from "ai";

export const initialMessages: Message[] = [{
    id: new Date().toISOString(),
    role: 'system',
    content: 'You are a helpful assistant. Answer as concisely as possible.'
}];

export default function Chat(){
    const { messages, input, isLoading, setMessages, stop, reload, handleInputChange, handleSubmit } = useChat({
        initialMessages
    });

    const chatListRef = useAutoScroll(messages);
    const scrollToBottom = useScrollToBottom(chatListRef);
    const isAtBottom = useScrollDetection(chatListRef);

    return (
         <>    
            <div ref={chatListRef} className="w-full overflow-y-auto px-2">
                <ChatList messages={messages}/>
                <PromptForm
                    input = {input}
                    isLoading = {isLoading}
                    setMessages = {setMessages}
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