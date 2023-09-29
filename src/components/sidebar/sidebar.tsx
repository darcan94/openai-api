'use client'
import * as Dialog from '@radix-ui/react-dialog';
import Button from '../button/Button';
import { IconClose, IconSidebar } from '../icons/Icons';

export default function Sidebar({
  className,
  children,
}: {
  className?: string;
  children?: any;
}) {
  return (
    <div className="flex">
    <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant="ghost" size="icon">
            <IconSidebar />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content className='flex bg-white/70 backdrop-blur-lg w-[300px] flex-col  absolute inset-y-0 left-0 z-10 h-full border-r bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left data-[state=closed]:duration-300 data-[state=open]:duration-500 sm:max-w-sm'>
              <Dialog.Title>
                Chat History
              </Dialog.Title>
            {children}
            <Dialog.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
              <IconClose />
              <span className='sr-only'>Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>  
    </Dialog.Root>
    </div>
  );
}
  