import { Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import React from "react";

type ActionButtonProps = {
  actionFn: () => Promise<void>;
  label?: string;
  confirmationText?: string;
  successMessage?: string;
  errorMessage?: string;
  colorScheme?: string;
  isLoading?: boolean;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  actionFn,
  label = "Confirm",
  confirmationText,
  successMessage = "Action successful.",
  errorMessage = "Action failed.",
  colorScheme = "blue",
  isLoading = false,
  onSuccess,
  onError,
}) => {
  const handleClick = async () => {
  if (confirmationText && !window.confirm(confirmationText)) return;

  try {
    toaster.promise(
      actionFn(),
      {
        loading: { title: "Processing..." },
        success: { title: "Success", description: successMessage },
        error: { title: "Error", description: errorMessage },
      }
    );
    onSuccess?.();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    onError?.(err);
  }
};


  return (
    <Button
      onClick={handleClick}
      colorPalette={colorScheme}
      loading={isLoading}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
