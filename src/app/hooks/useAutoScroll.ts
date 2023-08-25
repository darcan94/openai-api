import { RefObject, useEffect, useRef } from "react";
import { type Message } from "ai";

export default function useAutoScroll(refDependency: Message[]): RefObject<HTMLDivElement>{
    const chatListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ref = chatListRef.current;
        const scrollToBottom = () => {
            if(ref) {
                ref.scrollTop = ref.scrollHeight;
            }
        };

        scrollToBottom();
    }, [refDependency]);

    return chatListRef;
}