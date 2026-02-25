import { Dialog, DialogOverlay } from "@/components/ui/dialog";

function LoadingDialog({ open }: { open: boolean }) {
  return (
    <Dialog open={open}>
      <DialogOverlay className="fixed inset-0 bg-black/20 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
      </DialogOverlay>
    </Dialog>
  );
}

export default LoadingDialog;
