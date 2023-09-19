import useEnterSend from "@/hooks/useEnterSend";
import { ChangeEvent, FormEvent } from "react";
import Button from "@/components/button/Button";
import TextArea from "@/components/textArea/TextArea";
import {
  IconClearChat,
  IconReload,
  IconStop,
  IconSubmit,
} from "@/components/icons/Icons";
import { Message } from "ai";
import { initialMessages } from "@/components/chat/chat";

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  hasMessage: boolean;
  setMessages: (messages: Message[]) => void;
  stop: () => void;
  reload: () => void;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PromptForm({
  input,
  isLoading,
  hasMessage,
  setMessages,
  stop,
  reload,
  handleInputChange,
  handleSubmit,
}: ChatFormProps) {
  const { formRef, onKeyDown } = useEnterSend();

  return (
    <div className="sticky bottom-0  w-full border-t border-t-black/10 bg-white/70 backdrop-blur-lg">
      <div className="mt-2 flex h-auto items-center justify-center py-1">
        {isLoading ? (
          <Button variant="outline" onClick={() => stop()} className="bg-white">
            <IconStop />
            Stop generating
          </Button>
        ) : (
          hasMessage && (
            <Button
              variant="outline"
              onClick={() => reload()}
              className="bg-white"
            >
              <IconReload />
              Regenerate response
            </Button>
          )
        )}
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center rounded-xl border border-black/10 bg-slate-50 p-1 backdrop-blur-lg">
          <Button
            variant="ghost"
            disabled={!hasMessage}
            onClick={() => setMessages(initialMessages)}
          >
            <IconClearChat />
            <span className="sr-only"> New Chat </span>
          </Button>

          <TextArea
            input={input}
            handleInputChange={handleInputChange}
            onKeyDown={onKeyDown}
          />

          <Button
            type="submit"
            disabled={isLoading || input === ""}
            variant="ghost"
          >
            <IconSubmit />
            <span className="sr-only"> Send message </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
