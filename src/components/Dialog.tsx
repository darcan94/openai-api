import Button from "@/components/ui/Button";
import { useEffect, useRef } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: (closed: boolean) => void;
  onConfirm: () => void;
}

export default function Dialog({ isOpen, onClose, onConfirm }: DialogProps) {  
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (    
      <dialog ref={dialogRef} className="backdrop:bg-black/60 fixed inset-0 space-y-8 p-6 rounded-lg bg-secondary shadow-lg">
        <h3>Are you sure you want to delete the chat?</h3>
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={() => onClose(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </dialog>
  );
}