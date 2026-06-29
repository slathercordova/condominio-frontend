import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/auth-store";

export function ProtectedRouter() {
  const usuario = useAuthStore(state => state.usuario);
  const accessToken = usuario?.accessToken;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
