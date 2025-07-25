import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearStore: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clearStore: () => set({ user: null, token: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
