import { ChangeEvent, FormEvent } from "react";

interface ChatFormProps{
    input: string;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PromptField({input, handleInputChange, handleSubmit}: ChatFormProps){  
    return(
        <form onSubmit={handleSubmit} className="sticky bottom-0 w-full backdrop-blur-md p-2">
            <div className="flex bg-slate-50 backdrop-blur-lg rounded-xl p-1">
                <textarea className="bg-transparent resize-none w-4/5 outline-none"
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder="type a message">    
                </textarea>
                <button className="w-1/5" type="submit">Send</button>
            </div>
        </form>
    )
}