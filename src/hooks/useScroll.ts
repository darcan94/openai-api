import { RefObject, useEffect, useRef, useState } from "react";
import { type Message } from "ai";

export function useAutoScroll(
  refDependency: Message[],
): RefObject<HTMLDivElement> {
  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = chatListRef.current;
    const scrollToBottom = () => {
      if (ref) {
        ref.scrollTop = ref.scrollHeight;
      }
    };

    scrollToBottom();
  }, [refDependency]);

  return chatListRef;
}

export function useScrollToBottom(ref: RefObject<HTMLDivElement>) {
  const scrollToBottom = () => {
    const reference = ref.current;
    reference?.scrollTo({
      top: reference?.scrollHeight,
      behavior: "smooth",
    });
  };

  return scrollToBottom;
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
