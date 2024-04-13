import useTextareaAutoHeight from "@/hooks/useTextareaAutoHeight";
import { KeyboardEvent, ChangeEvent } from "react";

interface ChatFormProps {
  input: string;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  input,
  handleInputChange,
  onKeyDown,
}: ChatFormProps) {
  const textareaRef = useTextareaAutoHeight(input);
  return (
    <textarea
      autoFocus={true}
      ref={textareaRef}
      tabIndex={0}
      rows={1}
      className="w-full rounded-full max-h-32 resize-none bg-transparent px-4 py-[.5rem] text-font outline-none sm:text-sm"
      onKeyDown={(evt) => onKeyDown(evt)}
      value={input}
      onChange={handleInputChange}
      placeholder="Send a message"
    ></textarea>
  );
}
