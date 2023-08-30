import useEnterSend from "@/app/hooks/useEnterSend";
import useTextareaAutoHeight from "@/app/hooks/useTextareaAuttoHeight";
import { ChangeEvent, FormEvent } from "react";
import SendButton from "@/components/sendButton/sendButton";

interface ChatFormProps{
    input: string;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PromptField({input, handleInputChange, handleSubmit}: ChatFormProps){  

    const {formRef, onKeyDown} = useEnterSend();
    const textareaRef = useTextareaAutoHeight(input);

    return(
        <form ref={formRef} onSubmit={handleSubmit} className="sticky bottom-0 w-full bg-white/50 backdrop-blur-md p-4 mt-2">
            <div className="flex bg-slate-50 backdrop-blur-lg rounded-xl p-1">
                <textarea
                    ref={textareaRef}
                    tabIndex={0}
                    rows={1}
                    className="bg-transparent resize-none w-11/12 outline-none px-4 py-[.5rem] sm:text-sm"
                    onKeyDown={onKeyDown} 
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder="type a message">    
                </textarea>
               <SendButton />
            </div>
        </form>
    )
}