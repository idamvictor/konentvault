import { create } from "zustand";

interface User {
  id: string;
  name: string;
  image?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUser = create<UserStore>((set) => ({
  // user: null,

  user: {
    id: "default-user-id",
    name: "Default User",
    image: "/images/avatar-1.jpeg",
  },
  setUser: (user) => set({ user }),
}));
