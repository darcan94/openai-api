import useTextareaAutoHeight from "@/hooks/useTextareaAuttoHeight";
import { KeyboardEvent, ChangeEvent } from "react";

interface ChatFormProps{
    input: string;
    handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea( {input, handleInputChange, onKeyDown }: ChatFormProps){
    const textareaRef = useTextareaAutoHeight(input);
    return(
         <textarea
            ref={textareaRef}
            tabIndex={0}
            rows={1}
            className="bg-transparent resize-none w-11/12 outline-none px-4 py-[.5rem] sm:text-sm"
            onKeyDown={(evt) => onKeyDown(evt)} 
            value={input} 
            onChange={handleInputChange} 
            placeholder="type a message">    
        </textarea>
    );
}