import type { IErrorResponse } from "@/sharedType";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export const showErrorToast = (
  error: unknown,
  fallback = "Something went wrong.",
) => {
  const err = error as AxiosError<IErrorResponse>;
  const message = err.response?.data?.message || fallback;
  toast.error(message, {
    description: "Please try again.",
    duration: 5000,
  });
};
