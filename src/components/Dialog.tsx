import Button from "@/components/ui/Button";

interface DialogProps {
  onClose: (closed: boolean) => void;
  onConfirm: () => void;
}

export default function Dialog({ onClose, onConfirm }: DialogProps) {
  
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80"  
      onClick={() => onClose(false)}>
      <div className="space-y-8 rounded-lg bg-secondary p-6 shadow-md">
        <h3>Are you sure you want to delete the chat?</h3>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onClose(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
