import { axiosBackendInstance } from "@/services/axiosInstance";
import { User } from "@/types/user.type";
import { create, StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";

// type AuthState = ExtractState<typeof useAuthStore>

interface AuthState {
  user: User | null;
  token: string | null;
}

export interface AuthAction {
  setUser: (user: User | null) => void;
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
        const userProfile: User = {
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
    setUser: (user: User | null) => set({ user: user }),
    setToken: (token: string | null) => set({ token: token }),
  })),
);
