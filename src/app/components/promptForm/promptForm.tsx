import useEnterSend from "@/app/hooks/useEnterSend";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "@/app/components/ui/Button";
import TextArea from "@/app/components/ui/TextArea";
import {
  IconReload,
  IconStop,
  IconSubmit,
} from "@/app/components/ui/Icons";

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

  return (
    <div className="sticky bottom-0 w-full bg-secondary-alpha backdrop-blur-md">
      
        {isLoading ? (
            <div className="mt-2 flex h-auto items-center justify-center py-1">
              <Button
                variant="outline"
                onClick={() => stop()}
                className="bg-secondary text-font">
                  <IconStop />
                  Stop generating
              </Button>
            </div>
        ) : (
          hasMessage && (
            <div className="mt-2 flex h-auto items-center justify-center py-1">
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-secondary text-font">
                  <IconReload />
                  Regenerate response
              </Button>
            </div>
          )
        )}
      
      <form ref={formRef} onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center rounded-2xl border border-gray-200 bg-secondary p-1 dark:border-white/10">
          <TextArea
            input={input}
            handleInputChange={handleInputChange}
            onKeyDown={onKeyDown}/>

          <Button
            type="submit"
            disabled={isLoading || input === ""}
            variant="ghost"
            className="text-font">
              <IconSubmit />
              <span className="sr-only"> Send message </span>
          </Button>
        </div>
      </form>
    </div>
  );
}
