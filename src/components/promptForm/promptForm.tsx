import useEnterSend from "@/hooks/useEnterSend";
import { ChangeEvent, FormEvent } from "react";
import Button from "@/components/button/Button";
import TextArea from "@/components/textArea/TextArea";
import { IconClearChat, IconReload, IconStop, IconSubmit } from "@/components/icons/Icons";
import { Message } from "ai";
import { initialMessages } from "@/components/chat/chat";

interface ChatFormProps{
    input: string;
    isLoading: boolean;
    hasMessage: boolean;
    setMessages: (messages: Message[])=> void ;
    stop: () => void;
    reload: () => void;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PromptForm({
    input, isLoading, hasMessage, setMessages, stop, reload, handleInputChange, handleSubmit
}: ChatFormProps){
    
    const {formRef, onKeyDown} = useEnterSend();

    return(
        <div className="bg-white/50 backdrop-blur-lg  sticky bottom-0 w-full shadow-md">
            <div className="flex h-auto items-center justify-center py-1 mt-2">
                {isLoading ? (
                    <Button
                        variant="outline"
                        onClick={() => stop()}
                        className="bg-background">
                            <IconStop />
                            Stop generating
                    </Button>
                ) : (
                    hasMessage && (<Button
                        variant="outline"
                        onClick={() => reload()}
                        className="bg-background">
                            <IconReload />    
                            Regenerate response
                    </Button>)
                ) }
            </div>
            <form ref={formRef} onSubmit={handleSubmit} className="p-4">
                <div className="flex items-center bg-slate-50 backdrop-blur-lg rounded-xl p-1">         
                    <Button
                        variant="ghost"
                        disabled={!hasMessage}
                        onClick={() => setMessages(initialMessages)}>
                            <IconClearChat />
                            <span className="sr-only"> New Chat </span>
                    </Button>

                    <TextArea 
                        input={input} 
                        handleInputChange={handleInputChange} 
                        onKeyDown = { onKeyDown }/>

                    <Button
                        type="submit" 
                        disabled={isLoading || input === ''}
                        variant="ghost">
                            <IconSubmit />
                            <span className="sr-only"> Send message </span>
                    </Button>        
                </div>
            </form>
        </div>
    )
}