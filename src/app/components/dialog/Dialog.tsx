import { Button } from "../ui/Button";

interface DialogProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function Dialog({ onClose, onConfirm }: DialogProps) {
  console.log('xxxxx');
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60"  onClick={onClose}>
      <div className="rounded-lg bg-secondary p-4 shadow-md">
        <p>¿Estás seguro de que deseas eliminar chat?</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="secondary"
            className="rounded bg-background px-3 py-1 text-font"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="mr-2 rounded bg-red-500 px-3 py-1 text-white"
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
