import { toast } from "sonner";
const successToast = (message: string) => {
  if (!message) {
    message = "Action completed successfully!";
  }
  toast.success(message);
};

export default successToast;
