import { ObjectId } from "mongodb";
import { Button } from "../ui/Button";

interface DialogProps {
  chat: any,
  onClose: (closed: boolean) => void;
  onConfirm: (id: ObjectId) => void;
}

export default function Dialog({ chat, onClose, onConfirm }: DialogProps) {
  const handleClose = () => {
    onClose(false);
  }

  const handleConfirm = (id: ObjectId) => {
    onConfirm(id);
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-80"  onClick={() => handleClose()}>
      <div className="rounded-lg bg-secondary p-4 shadow-md">
        <p>¿Estás seguro de que deseas eliminar el chat? 😕</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="secondary"
            className="rounded bg-background px-3 py-1 text-font"
            onClick={() => handleClose()}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="mr-2 rounded bg-danger px-3 py-1 text-white"
            onClick={() => handleConfirm(chat._id)}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
