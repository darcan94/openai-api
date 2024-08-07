import useTextareaAutoHeight from "@/hooks/useTextareaAutoHeight";
import { KeyboardEvent } from "react";

interface Props {
  input: string;
  setInput: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  input,
  setInput,
  onKeyDown,
}: Props) {
  const textareaRef = useTextareaAutoHeight(input);
  return (
    <textarea
      id="prompt_field"
      autoFocus={true}
      ref={textareaRef}
      tabIndex={0}
      rows={1}
      onChange={e => setInput(e.target.value)}
      className="w-full rounded-3xl max-h-32 resize-none bg-transparent px-4 py-[.5rem] text-font outline-none sm:text-sm"
      onKeyDown={onKeyDown}
      value={input}
      placeholder="Send a message"
    ></textarea>
  );
}
