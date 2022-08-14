import { Navigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";

function RoleProtectedRoute({ mode, children }) {
  const role = useUserStore((state) => state.role);

  if (role !== mode) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}

export default RoleProtectedRoute;
