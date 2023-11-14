import { FieldError } from "react-hook-form";

export const InputErrorMessage: React.FC<{ error?: FieldError }> = ({
  error,
}) => {
  return error ? (
    <span className="text-red-600 text-sm">{error.message}</span>
  ) : null;
};
