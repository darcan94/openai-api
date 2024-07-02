import useEnterSend from "@/hooks/useEnterSend";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import { IconReload, IconStop, IconSubmit, ImageIcon } from "@/components/ui/Icons";
import { useState } from "react";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file){
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDeleteImage = () => {
    setImagePreview(null);
    setInput('');
  }

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
        className="mx-auto w-full lg:w-8/12 p-4"
      >
        <div className="rounded-[30px] border border-gray-200 bg-secondary dark:border-white/10">
          {imagePreview && (
            <div className="px-2 py-2 w-max relative group">
              <img src={imagePreview} alt="Image Preview" className="w-36 h-28 object-cover rounded-[20px]" />
              <button 
                type="button"
                onClick={handleDeleteImage}
                className="absolute hidden top-0 right-0 bg-danger rounded-full px-2 focus:outline-none group-hover:block">
                  x
              </button>
            </div>
          )}
          <div className="flex items-center w-full min-h-[4rem] p-1"> 
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
                  className="bg-background h-full text-font">
                    <IconStop />
                    <span className="sr-only"> Stop message </span>
                </Button>
              ) : (
              (hasMessage && input === "") && (
                  <Button
                    variant="rounded"
                    onClick={() => reload()}
                    className="bg-background h-full text-font">
                      <IconReload />
                      <span className="sr-only"> Reload message </span>                  
                  </Button>
              )
            )}

            { !imagePreview && (
              <>
                <label className="px-2" htmlFor="file-input">
                  <ImageIcon />
                </label>
                <input
                className="hidden" 
                id="file-input" 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}/>
              </>)}

            {
              !(isLoading || input === "") && 
                ( <Button type="submit" variant="ghost">
                    <IconSubmit />
                    <span className="sr-only"> Send message </span>
                  </Button> )
            }
          </div> 
          
        </div>  
      </form>
    </div>
  );
}