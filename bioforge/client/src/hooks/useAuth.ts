import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { PATHS } from "@/router/paths";
import { APP_CONTENT } from "@/constant/appConstants";
import { authApi } from "@api/auth";
import type { LoginCredentials } from "@/types/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginToStore = useAuthStore((state) => state.login);
  const CONTENT = APP_CONTENT.auth.login;

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),

    onSuccess: (data, variables) => {
      loginToStore(data.access_token, {
        name: data.user_name,
        email: variables.email,
        isAdmin: data.is_admin,
      });

      toast.success(`${CONTENT.TOAST_SUCCESS}, ${data.user_name}`);

      const from = (location.state as any)?.from?.pathname || PATHS.design;
      navigate(from, { replace: true });
    },

    onError: (error: Error) => {
      toast.error(CONTENT.TOAST_ERROR, { description: error.message });
    },
  });
};
