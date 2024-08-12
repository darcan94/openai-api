import useEnterSend from "@/hooks/useEnterSend";
import Button from "@/components/ui/Button";
import { IconReload, IconStop, IconSubmit, ImageIcon } from "@/components/ui/Icons";
import { useState } from "react";
import Image from "next/image";
import useTextareaAutoHeight from "@/hooks/useTextareaAutoHeight";


interface Attachment {
  name?: string;
  contentType?: string;
  url: string;
}
interface Props {
  input: string;
  setInput: (input: string) => void;
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
}: Props) {
  const { formRef, onKeyDown } = useEnterSend();
  const textareaRef = useTextareaAutoHeight(input);
  const [imagePreview, setImagePreview] = useState<Attachment[] | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file){      
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          const attachment: Attachment[] = [{
            name: file.name,
            contentType: file.type,
            url: e.target.result
          }]

          setImagePreview(attachment);
        }
      };
      
      reader.readAsDataURL(file);
    }
  }

  const handleDeleteImage = () => {
    setImagePreview(null);
  }

  return (
    <div className="sticky bottom-0 w-full bg-background-alpha backdrop-blur-md">
      <form
        ref={formRef}
        className="mx-auto w-full lg:w-8/12 p-4"
        onSubmit={async e => {
          e.preventDefault();
          if(!input?.trim()) {
            return
          }
          setInput('');
          setImagePreview(null);
          await onSubmit({ 
            content: input,
            experimental_attachments: imagePreview,
            role: 'user'
          });
        }}
      >
        <div className="rounded-[30px] border border-gray-200 bg-secondary dark:border-white/10">
          {imagePreview && (
            <div className="px-2 py-2 w-max relative group">
              <Image width={6} height={4} src={imagePreview[0].url} alt="Image Preview" className="w-36 h-28 object-cover rounded-[20px]" />
              <button 
                type="button"
                onClick={handleDeleteImage}
                className="absolute hidden text-white top-0 right-0 bg-danger rounded-full px-2 focus:outline-none group-hover:block">
                  x
              </button>
            </div>
          )}
          <div className="flex items-center w-full min-h-[4rem] p-1"> 
          <textarea
            name="prompt"
            ref={textareaRef}
            autoFocus={true}
            tabIndex={0}
            rows={1}
            onChange={e => setInput(e.target.value)}
            className="w-full rounded-3xl max-h-32 resize-none bg-transparent px-4 py-[.5rem] text-font outline-none sm:text-sm"
            onKeyDown={onKeyDown}
            value={input}
            placeholder="Send a message"
          ></textarea>

            { (!imagePreview && !isLoading) && (
              <>
                <label className="px-2 cursor-pointer" htmlFor="file-input">
                  <ImageIcon />
                </label>
                <input
                  id="file-input"
                  className="hidden" 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}/>
              </>)
            }

            {
              isLoading ? (
                <Button
                  variant="rounded"
                  onClick={stop}
                  className="bg-background h-full text-font">
                    <IconStop />
                    <span className="sr-only"> Stop message </span>
                </Button>
              ) : (
              (hasMessage && input === "") && (
                  <Button
                    variant="rounded"
                    onClick={reload}
                    className="bg-background h-full text-font">
                      <IconReload />
                      <span className="sr-only"> Reload message </span>                  
                  </Button>
              )
            )}

            {
              !(isLoading || input === "") && 
                ( <Button type="submit" variant="ghost" size="icon" className="px-1">
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