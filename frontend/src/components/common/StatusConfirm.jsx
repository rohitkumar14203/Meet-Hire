import { Button } from "./Button";
import { AlertCircle } from "lucide-react";

export const StatusConfirm = ({
  title = "Change Job Status",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="bg-amber-100 p-2 rounded-full">
          <AlertCircle className="w-6 h-6 text-amber-600" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button
          variant="primary"
          loading={loading}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};
