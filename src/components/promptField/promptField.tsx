import { ChangeEvent, FormEvent } from "react";

interface ChatFormProps{
    input: string;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PromptField({input, handleInputChange, handleSubmit}: ChatFormProps){  
    return(
        <form onSubmit={handleSubmit}>
            <textarea 
                value={input} 
                onChange={handleInputChange} 
                placeholder="type a message">    
            </textarea>
            <button type="submit">Send</button>
        </form>
    )
}