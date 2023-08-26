import { RefObject, useEffect, useRef } from "react";

export default function useTextareaAutoHeight(input: string): RefObject<HTMLTextAreaElement>{
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const ref = textAreaRef.current;
        if(ref){
            ref.style.height = "auto";
            ref.style.height = `${ref.scrollHeight}px`;
        }

    }, [input]);

    return textAreaRef;
}