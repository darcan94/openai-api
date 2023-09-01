import useEnterSend from "@/hooks/useEnterSend";
import { ChangeEvent, FormEvent } from "react";
import SendButton from "@/components/sendButton/sendButton";
import TextArea from "@/components/textArea/TextArea";

interface ChatFormProps{
    input: string;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PromptForm({input, handleInputChange, handleSubmit}: ChatFormProps){  

    const {formRef, onKeyDown} = useEnterSend();

    return(
        <form ref={formRef} onSubmit={handleSubmit} className="sticky bottom-0 w-full bg-white/50 backdrop-blur-md p-4 mt-2">
            <div className="flex bg-slate-50 backdrop-blur-lg rounded-xl p-1">                
               <TextArea 
                    input={input} 
                    handleInputChange={handleInputChange} 
                    onKeyDown = { onKeyDown }/>
               <SendButton />
            </div>
        </form>
    )
}