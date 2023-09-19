import { KeyboardEvent, RefObject, useRef } from "react";

interface enterSubmirProps {
  formRef: RefObject<HTMLFormElement>;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function useEnterSend(): enterSubmirProps {
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      formRef.current?.requestSubmit();
      event.preventDefault();
    }
  };

  return { formRef, onKeyDown: handleKeyDown };
}
