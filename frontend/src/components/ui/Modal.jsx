import { X } from "lucide-react";
import { useEffect } from "react";

export const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} z-10 animate-in zoom-in-95 duration-200`}>
        {/* Header */}
        <div className="flex justify-between items-center border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white px-6 py-4 rounded-t-2xl">
          <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
          <button
            className="text-gray-400 hover:text-gray-600 hover:bg-blue-100 rounded-lg p-1.5 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
