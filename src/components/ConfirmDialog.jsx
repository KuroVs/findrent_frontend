function ConfirmDialog({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null; // si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-xl">
        <h2 className="text-lg font-semibold mb-2">Confirmar acción</h2>
        <p className="text-gray-600 text-sm mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="border px-4 py-2 rounded text-sm cursor-pointer hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm cursor-pointer hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
