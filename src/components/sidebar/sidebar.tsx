"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components//button/Button";
import { IconClose, IconSidebar } from "@/components/icons/Icons";

export default function Sidebar({ children }: { children?: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon">
          <IconSidebar />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="bg-background data-state=open fixed inset-y-0 left-0 z-10 flex h-full w-[300px] flex-col border-r bg-white/70 p-6 shadow-lg backdrop-blur-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm ">
          <Dialog.Title>Chat History</Dialog.Title>
          {children}
          <Dialog.Close className="ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <IconClose />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
