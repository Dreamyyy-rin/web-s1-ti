import { create, StateCreator } from "zustand";
import { persist, devtools } from "zustand/middleware";

// type AuthState = ExtractState<typeof useLoaderStore>

interface LoaderState {
  isPageLoading: boolean;
  isAuthLoading: boolean;
  isGeneralLoading: boolean;
}

export interface LoaderAction {
  setPageLoading: (isPageLoading: boolean) => void;
  setAuthLoading: (isAuthLoading: boolean) => void;
  updateGeneralLoading: () => void;
}

interface LoaderStore extends LoaderState, LoaderAction {}

const middleware = <T extends object>(
  f: StateCreator<T, [["zustand/persist", unknown]], [], T>,
) => devtools(persist(f, { name: "loaderStore" }));

export const useLoaderStore = create<LoaderStore>()(
  middleware((set, get) => ({
    isPageLoading: false,
    isAuthLoading: false,
    isGeneralLoading: false,
    //actions
    setPageLoading: (isPageLoading: boolean) => {
      set({ isPageLoading });
      get().updateGeneralLoading();
    },
    setAuthLoading: (isAuthLoading: boolean) => {
      set({ isAuthLoading });
      get().updateGeneralLoading();
    },
    updateGeneralLoading: () => {
      const state = get();
      const isGeneralLoading = state.isPageLoading || state.isAuthLoading;
      set({ isGeneralLoading });
    },
  })),
);
