import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Input = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon: Icon,
  helperText,
  required,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="mb-2 font-medium text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border rounded-lg px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            Icon ? "pl-10" : ""
          } ${
            isPassword ? "pr-10" : ""
          } ${
            error 
              ? "border-red-300 bg-red-50 focus:ring-red-500" 
              : "border-gray-300 bg-white hover:border-blue-300"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-sm mt-1.5">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <span className="text-gray-500 text-sm mt-1">{helperText}</span>
      )}
    </div>
  );
};