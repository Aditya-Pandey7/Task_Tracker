import { useAppSelector } from "@/store";
import { Navigate } from "react-router-dom";
import LoadingDialog from "./shared/loadingDialog";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  if (isLoading) {
    return <LoadingDialog open={true} />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
