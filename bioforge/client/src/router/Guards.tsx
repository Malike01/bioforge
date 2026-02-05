import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { PATHS } from "./paths";

export const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate to={PATHS.auth.login} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};

export const GuestGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={PATHS.design} replace />;
  }

  return <Outlet />;
};
