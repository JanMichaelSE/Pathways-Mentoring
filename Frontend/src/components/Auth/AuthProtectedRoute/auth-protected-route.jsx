import { useUserStore } from "@/store/user.store";
import { Navigate , useLocation} from "react-router-dom";
import { getJWTExpireDate } from "@/utils/auth.utils";

function AuthProtectedRoute({ redirectPath = "/", children }) {
  const location = useLocation();
  const accessToken = useUserStore((state) => state.accessToken);
  const refreshToken = useUserStore((state) => state.refreshToken);
  const expirationTime = getJWTExpireDate(accessToken);
  const hasExpired = Date.now() >= expirationTime;

  if (!accessToken && !refreshToken && hasExpired) {
    return <Navigate to={redirectPath}  replace state={{from: location}} />;
  }

  return children;
}

export default AuthProtectedRoute;
