import { RefObject, useEffect, useRef, useState } from "react";
import { type Message } from "ai";

const scrollToBottom = (reference: HTMLDivElement | null) => {
  reference?.scrollTo({
    top: reference.scrollHeight,
    behavior: "smooth",
  });
}

export function useAutoScroll(
  refDependency: Message[],
): RefObject<HTMLDivElement> {
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom(chatListRef.current);
  }, [refDependency]);

  return chatListRef;
}

export function useScrollToBottom(ref: RefObject<HTMLDivElement>) {
  return () => scrollToBottom(ref.current);
}

export function useScrollDetection(chatListRef: RefObject<HTMLDivElement>) {
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const ref = chatListRef.current;
      if (ref)
        setIsAtBottom(ref.scrollTop + ref.clientHeight >= ref.scrollHeight - 1);
    };

    const ref = chatListRef.current;
    ref?.addEventListener("scroll", handleScroll);

    return () => {
      ref?.removeEventListener("scroll", handleScroll);
    };
  }, [chatListRef]);

  return isAtBottom;
}
