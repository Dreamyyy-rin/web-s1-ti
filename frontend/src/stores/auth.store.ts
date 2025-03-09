import { User } from "@/features/user/types/user.type";
import { axiosBackendInstance } from "@/services/axiosInstance";
import { create, StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";

// type AuthState = ExtractState<typeof useAuthStore>

interface AuthState {
  user: Omit<User, "id"> | null;
  token: string | null;
}

export interface AuthAction {
  setUser: (user: Omit<User, "id"> | null) => void;
  setToken: (token: string | null) => void;
  isAuthenticated: () => Promise<boolean>;
}

interface AuthStore extends AuthState, AuthAction {}

const middleware = <T extends object>(
  f: StateCreator<T, [["zustand/persist", unknown]], [], T>,
) => devtools(persist(f, { name: "authStore" }));

export const useAuthStore = create<AuthStore>()(
  middleware((set, get) => ({
    token: null,
    user: null,
    //actions
    isAuthenticated: async () => {
      try {
        if (!get().token) {
          set({ user: null });
          return false;
        }
        const response = await axiosBackendInstance.get("/me", {});
        const userProfile: Omit<User, "id"> = {
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
        };
        set({ user: userProfile });
        return true;
      } catch {
        set({ user: null, token: null });
        return false;
      }
    },
    setUser: (user: Omit<User, "id"> | null) => set({ user: user }),
    setToken: (token: string | null) => set({ token: token }),
  })),
);
