import { ButtonStyles } from "../../styles/ui";

export const Button = ({
  children,
  variant = "primary",
  loading,
  className = "",
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
      {loading ? "Loading..." : children}
    </button>
  );
};
