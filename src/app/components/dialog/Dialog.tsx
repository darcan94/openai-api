interface DialogProps{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function Dialog( { isOpen, onClose, onConfirm}: DialogProps ){
    if (!isOpen) return null;

    return(
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            
            <div className="bg-white p-4 rounded-lg shadow-md">
                <p>¿Estás seguro de que deseas eliminar chat?</p>
                <div className="mt-4 flex justify-end">
                <button
                    className="mr-2 px-3 py-1 text-white bg-red-500 rounded"
                    onClick={onConfirm}>
                    Confirmar
                </button>
                <button
                    className="px-3 py-1 text-gray-600 bg-gray-200 rounded"
                    onClick={onClose}>
                    Cancelar
                </button>
                </div>
            </div>
        </div>
    );
}