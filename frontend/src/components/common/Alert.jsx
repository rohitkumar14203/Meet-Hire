import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

/**
 * Alert Component - Display contextual feedback messages
 * Usage:
 * <Alert variant="success" title="Success!" onClose={handleClose}>
 *   Your changes have been saved successfully.
 * </Alert>
 */
export const Alert = ({ 
  variant = "info", 
  title, 
  children, 
  onClose,
  className = "" 
}) => {
  const variants = {
    success: {
      container: "bg-green-50 border-green-200 text-green-900",
      icon: CheckCircle,
      iconColor: "text-green-600",
      button: "text-green-600 hover:bg-green-100",
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-900",
      icon: AlertCircle,
      iconColor: "text-red-600",
      button: "text-red-600 hover:bg-red-100",
    },
    warning: {
      container: "bg-amber-50 border-amber-200 text-amber-900",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      button: "text-amber-600 hover:bg-amber-100",
    },
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-900",
      icon: Info,
      iconColor: "text-blue-600",
      button: "text-blue-600 hover:bg-blue-100",
    },
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={`flex items-start gap-3 p-4 border rounded-lg ${config.container} ${className}`}>
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
      
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <div className="text-sm">{children}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className={`p-1 rounded-lg transition-colors ${config.button}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
