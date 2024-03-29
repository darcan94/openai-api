import useEnterSend from "@/app/hooks/useEnterSend";
import { ChangeEvent, FormEvent } from "react";
import { Button } from "@/app/components/ui/Button";
import TextArea from "@/app/components/ui/TextArea";
import { IconReload, IconStop, IconSubmit } from "@/app/components/ui/Icons";

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
    <div className="sticky bottom-0 w-full bg-background-alpha backdrop-blur-md">
    

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mx-auto  w-8/12 p-4"
      >
        <div className="flex min-h-[4rem] items-center rounded-full border border-gray-200 bg-secondary p-1 dark:border-white/10">
          <TextArea
            input={input}
            handleInputChange={handleInputChange}
            onKeyDown={onKeyDown}
          />

          {
            isLoading ? (
                <Button
                  variant="rounded"
                  onClick={() => stop()}
                  className="bg-background h-full text-font"
                >
                  <IconStop />
                </Button>
            ) : (
            (hasMessage && input === "") && (
                <Button
                  variant="rounded"
                  onClick={() => reload()}
                  className="bg-background h-full text-font"
                >
                  <IconReload />                  
                </Button>
            )
          )}
          
          {!(isLoading || input === "") && (<Button
            type="submit"
            variant="ghost"
          >
            <IconSubmit />
            <span className="sr-only"> Send message </span>
          </Button>)}
        </div>
      </form>
    </div>
  );
}