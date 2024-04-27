import { Button } from "@/components/ui/Button";

interface DialogProps {
  onClose: (closed: boolean) => void;
  onConfirm: () => void;
}

export default function Dialog({ onClose, onConfirm }: DialogProps) {
  
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80"  onClick={() => onClose(false)}>
      <div className="rounded-2xl bg-secondary px-8 py-4 shadow-md">
        <p>Are you sure you want to delete the chat?</p>
        <div className="mt-8 flex justify-end gap-2">
          <Button
            variant="secondary"
            className="rounded bg-background px-3 py-1 text-font"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="mr-2 rounded bg-danger px-3 py-1 text-white"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
