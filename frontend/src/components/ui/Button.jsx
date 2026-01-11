import { ButtonStyles } from "../../styles/ui";
import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  variant = "primary",
  loading,
  className = "",
  icon: Icon,
  iconPosition = "left",
  ...props
}) => {
  const baseStyle = ButtonStyles.base;
  const variantStyle = ButtonStyles[variant] || ButtonStyles.primary;

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
};
