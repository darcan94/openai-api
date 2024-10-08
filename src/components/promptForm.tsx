import useEnterSend from "@/hooks/useEnterSend";
import Button from "@/components/ui/Button";
import { IconReload, IconStop, IconSubmit, ImageIcon } from "@/components/ui/Icons";
import { DragEvent, useRef, useState } from "react";
import Image from "next/image";
import useTextareaAutoHeight from "@/hooks/useTextareaAutoHeight";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  input: string;
  isLoading: boolean;
  hasMessage: boolean;
  stop: () => void;
  reload: () => void;
  handleInputChange:any;
  handleSubmit:any;
}

export default function PromptForm({
  input,
  isLoading,
  hasMessage,
  stop,
  reload,
  handleInputChange,
  handleSubmit
}: Props) {
  const { formRef, onKeyDown } = useEnterSend();
  const textareaRef = useTextareaAutoHeight(input);
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDeleteImage = (index: number) => {
    if(files){
      const updatedFiles = Array.from(files);      
      updatedFiles.splice(index, 1);
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach(file => dataTransfer.items.add(file));
      setFiles(dataTransfer.files);
    }
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 3){
      alert('Solo puedes seleccionar hasta 3 imágenes');
      setIsDragging(false);
      return;
    }

    const droppedFilesArray = Array.from(droppedFiles);
    
    if(droppedFilesArray.length > 0){
      const validFiles = droppedFilesArray.filter((file) => file.type.startsWith("image/"))
      
      if(validFiles.length > 0){
        const dataTransfer = new DataTransfer();
        validFiles.forEach((file) => dataTransfer.items.add(file));
        setFiles(dataTransfer.files);
      }else {
        console.error("Only image and text files are allowed!");
      }
    }

    setIsDragging(false);
  } 

  return (
    <div 
      className="sticky bottom-0 w-full backdrop-blur-md"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
        <AnimatePresence>
          {isDragging && (
            <motion.div
              className="absolute flex flex-col gap-1 bg-background-alpha backdrop-blur-sm h-full w-full z-10 justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>Drag and drop files here</div>
              <div className="text-sm text-font">
                {"(images)"}
              </div>
            </motion.div>
          )}
      </AnimatePresence>

        <form
          ref={formRef}
          className="mx-auto w-full lg:w-8/12 p-4"
          onSubmit={(event) => {
            handleSubmit(event, {
              experimental_attachments: files,
            });

            setFiles(undefined);

            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        >
          <div className="rounded-[30px] border border-gray-200 bg-secondary dark:border-white/10">
            
            <div className="flex flex-wrap">
              <AnimatePresence>
              {
                files && Array.from(files).map((file: File, index) => (
                  <motion.div 
                    key={index} 
                    className="w-max relative group py-2 pl-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      y: -10,
                      scale: 0.8,
                      opacity: 0,
                      transition: { duration: 0.2 },
                    }}>
                    <Image 
                      width={6} 
                      height={4} 
                      src={URL.createObjectURL(file)} 
                      alt="Image Preview" 
                      className="w-36 h-28 object-cover rounded-[20px]" />
                      
                    <button 
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute hidden text-white top-0 right-0 bg-danger rounded-full px-2 focus:outline-none group-hover:block">
                        x
                    </button>
                  </motion.div>
                ))
              }
              </AnimatePresence>
            </div>

            <div className="flex items-center w-full min-h-[4rem] p-1"> 
              <textarea
                name="prompt"
                ref={textareaRef}
                autoFocus={true}
                tabIndex={0}
                rows={1}
                onChange={handleInputChange}
                className="w-full rounded-3xl max-h-32 resize-none bg-transparent px-4 py-[.5rem] text-font outline-none sm:text-sm"
                onKeyDown={onKeyDown}
                value={input}
                placeholder="Send a message"
              ></textarea>

              { !isLoading && (
                <>
                  <label className="px-2 cursor-pointer" htmlFor="file-input">
                    <ImageIcon />
                  </label>
                  <input
                    id="file-input"
                    className="hidden" 
                    type="file"
                    onChange={(event) => {
                      if (event.target.files ) {
                        if(event.target.files.length > 3){
                          alert('Solo puedes seleccionar hasta 3 imágenes');
                        }
                        setFiles(event.target.files);
                      }
                    }}
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                  />
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