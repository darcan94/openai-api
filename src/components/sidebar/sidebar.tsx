"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components//button/Button";
import { IconClose, IconSidebar } from "@/components/icons/Icons";
import { useEffect, useRef, useState } from "react";

export default function Sidebar({ children }: { children?: React.ReactNode }) {

  const [isContainerReady, setContainerReady] = useState(false);

  const ref: any = useRef();

  useEffect(() => {
    ref.current = document.querySelector('main') ;
    setContainerReady(true); 
  }, []);

  return (
    <Dialog.Root defaultOpen={true} modal={false}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon">
          <IconSidebar />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </Dialog.Trigger>
     { isContainerReady && (<Dialog.Portal container={ref.current}>
        <Dialog.Overlay></Dialog.Overlay>
        <Dialog.Content 
        onPointerDownOutside={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
        className="bg-background inset-y-0 left-0 z-10 flex h-full w-[300px] flex-col border-r bg-white/70 p-6 shadow-lg backdrop-blur-lg   data-[state=closed]:animate-slide-to-left data-[state=open]:animate-slide-from-left sm:max-w-sm ">
          <Dialog.Title>Chat History</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>)}
    </Dialog.Root>
  );
}
 /**
  * <Dialog.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'>
                <IconClose />
                <span className='sr-only'>Close</span>
              </Dialog.Close>
  */