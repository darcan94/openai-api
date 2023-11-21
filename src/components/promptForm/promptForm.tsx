import useEnterSend from "@/hooks/useEnterSend";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button/Button";
import TextArea from "@/components/ui/textArea/TextArea";
import {
  IconClearChat,
  IconReload,
  IconStop,
  IconSubmit,
} from "@/components/ui/icons/Icons";
import { Message } from "ai";
import { initialPrompt } from "@/components/chat/chat";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="sticky bottom-0  w-full border-t border-t-black/10 bg-secondary-alpha backdrop-blur-lg">
      <div className="mt-2 flex h-auto items-center justify-center py-1">
        {isLoading ? (
          <Button
            variant="outline"
            onClick={() => stop()}
            className="bg-secondary"
          >
            <IconStop />
            Stop generating
          </Button>
        ) : (
          hasMessage && (
            <Button
              variant="outline"
              onClick={() => reload()}
              className="bg-secondary text-font"
            >
              <IconReload />
              Regenerate response
            </Button>
          )
        )}
      </div>
      <form ref={formRef} onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center rounded-xl border border-black/10 bg-secondary p-1 dark:border-white/10">
          <Button
            variant="ghost"
            disabled={!hasMessage}
            className="text-primary-dark"
            onClick={(e) => {
              e.preventDefault();
              router.refresh();
              router.push("/");
              setMessages(initialPrompt);
            }}
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
            className="text-font"
          >
            <IconSubmit />
            <span className="sr-only"> Send message </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
