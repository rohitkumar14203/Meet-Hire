export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-md z-10">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
