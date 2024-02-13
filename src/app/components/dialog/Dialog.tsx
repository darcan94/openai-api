import { Button } from "../ui/Button";

interface DialogProps{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function Dialog( { isOpen, onClose, onConfirm}: DialogProps ){
    if (!isOpen) return null;

    return(
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-70">            
            <div className="bg-secondary p-4 rounded-lg shadow-md">
                <p>¿Estás seguro de que deseas eliminar chat?</p>
                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        variant="secondary"
                        className="px-3 py-1 text-font bg-background rounded"
                        onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        className="mr-2 px-3 py-1 text-white bg-red-500 rounded"
                        onClick={onConfirm}>
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
}