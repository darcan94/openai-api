import useEnterSend from "@/hooks/useEnterSend";
import { Button } from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import { IconReload, IconStop, IconSubmit } from "@/components/ui/Icons";

interface ChatFormProps {
  input: string;
  setInput: any;
  isLoading: boolean;
  hasMessage: boolean;
  stop: () => void;
  reload: () => void;
  onSubmit: any;
}

export default function PromptForm({
  input,
  setInput,
  isLoading,
  hasMessage,
  stop,
  reload,
  onSubmit
}: ChatFormProps) {
  const { formRef, onKeyDown } = useEnterSend();

  return (
    <div className="sticky bottom-0 w-full bg-background-alpha backdrop-blur-md">
      <form
        ref={formRef}
        onSubmit={async e => {
          e.preventDefault();
          if(!input?.trim()) {
            return
          }
          setInput('');
          await onSubmit(input);
        }}
        className="mx-auto w-8/12 p-4"
      >
        <div className="flex min-h-[4rem] items-center rounded-[30px] border border-gray-200 bg-secondary p-1 dark:border-white/10">
          <TextArea
            input={input}
            setInput={setInput}
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
                  <span className="sr-only"> Stop message </span>
                </Button>
            ) : (
            (hasMessage && input === "") && (
                <Button
                  variant="rounded"
                  onClick={() => reload()}
                  className="bg-background h-full text-font"
                >
                  <IconReload />
                  <span className="sr-only"> Reload message </span>                  
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