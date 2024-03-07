import { Button } from "../ui/Button";

interface DialogProps{
    onClose: () => void;
    onConfirm: () => void;
}

export default function Dialog( { onClose, onConfirm}: DialogProps ){

    return(
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-60">            
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