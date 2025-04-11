import { axiosBackendInstance } from "@/services/axiosInstance";
import { useAuthStore } from "@/stores/auth.store";
import { GoogleAuth } from "../types/googleAuth.type";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function sendGoogleAuth(data: GoogleAuth) {
  return axiosBackendInstance.post("/google-login", data);
}

export function googleTokenExchange(token: string) {
  return axiosBackendInstance.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export function useGoogleAuth(redirect?: string) {
  const navigate = useNavigate();
  
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("token:" , tokenResponse)
      console.log("LEWAT SINI")
      const googleUserData = await googleTokenExchange(
        tokenResponse.access_token,
      );
      if (!googleUserData.data.email_verified) {
        throw new Error(
          "email belum diverifikasi. Silakan verifikasi email Anda melalui email terlebih dahulu.",
        );
      }
      const fullname = `${googleUserData.data.given_name} ${googleUserData.data.family_name}`;
      const email = googleUserData.data.email;
      console.log("lewat sini")
      const response = await sendGoogleAuth({
        name: fullname,
        email,
      });
      setUser({
        email: response.data.user.email,
        name: response.data.user.name,
        role: response.data.user.role,
      });
      setToken(response.data.token);
      toast.success("Login berhasil", {
        description: `Selamat datang ${response.data.user.name}!`,
      });
      if (redirect) {
        navigate({ to: redirect });
        return;
      }
      navigate({ to: "/admin" });
      return response;
    },
    onError: (error) => {
      console.log("ERROR: ", error)
      toast.error("Login gagal", {
        description:
          error.error_description ?? "Terjadi kesalahan yang tidak diketahui",
      });
    },
  });

  return {
    mutate: googleLogin,
  };
}
