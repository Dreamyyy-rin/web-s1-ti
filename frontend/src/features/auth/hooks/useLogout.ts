import { axiosBackendInstance } from "@/services/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

function logout() {
  return axiosBackendInstance.post("/logout");
}

export function useLogout() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await logout()
      return response.data
    },
    onSuccess: () => {
      setUser(null);
      setToken(null);
      navigate({ to: "/" });
      toast.success("Berhasil Logout", {
        description: "Sampai Jumpa!",
      });
    },
  });

  return mutation;
}
