import useEnterSend from "@/app/hooks/useEnterSend";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "@/app/components/ui/Button";
import TextArea from "@/app/components/ui/TextArea";
import {
  IconClearChat,
  IconReload,
  IconStop,
  IconSubmit,
} from "@/app/components/ui/Icons";
import { useRouter } from "next/navigation";

interface ChatFormProps {
  input: string;
  isLoading: boolean;
  hasMessage: boolean;
  stop: () => void;
  reload: () => void;
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function PromptForm({
  input,
  isLoading,
  hasMessage,
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
            className="bg-secondary text-font"
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
              router.push("/chat");
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
