import { create } from "zustand";

interface UIState {
  isSupportOpen: boolean;
  openSupport: () => void;
  closeSupport: () => void;
  toggleSupport: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSupportOpen: false,
  openSupport: () => set({ isSupportOpen: true }),
  closeSupport: () => set({ isSupportOpen: false }),
  toggleSupport: () =>
    set((state) => ({ isSupportOpen: !state.isSupportOpen })),
}));
