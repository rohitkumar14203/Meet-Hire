import { useEffect, useState } from "react";
import { Button } from "./Button";

/**
 * Form component that auto-enables/disables submit button based on validation
 * Usage:
 * <Form onSubmit={handleSubmit} requiredFields={['email', 'password']} values={formValues}>
 *   <Input ... />
 *   <FormSubmitButton>Submit</FormSubmitButton>
 * </Form>
 */
export const Form = ({ 
  children, 
  onSubmit, 
  requiredFields = [], 
  values = {}, 
  customValidation = null,
  className = "" 
}) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled = requiredFields.every(field => {
      const value = values[field];
      return value !== undefined && value !== null && value.toString().trim() !== '';
    });

    // Apply custom validation if provided
    const customValid = customValidation ? customValidation(values) : true;

    setIsValid(allFieldsFilled && customValid);
  }, [values, requiredFields, customValidation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {typeof children === 'function' ? children(isValid) : children}
    </form>
  );
};

/**
 * Submit button that works with Form component
 * Automatically disabled when form is invalid
 */
export const FormSubmitButton = ({ 
  children, 
  loading, 
  variant = "primary",
  icon,
  className = "",
  ...props 
}) => {
  return (
    <Button
      type="submit"
      variant={variant}
      loading={loading}
      icon={icon}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
};
