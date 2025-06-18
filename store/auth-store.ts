import { MinimalUser, User } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearToken: () => void;
  user: User | null;
  minimalUser: MinimalUser | null; // Persisted subset
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      minimalUser: null,
      setAccessToken: (accessToken: string) => {
        set({ accessToken });
      },

      setUser: (user: User) => {
        if (user) {
          const minimalUser: MinimalUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            userType: user.userType,
            email: user.email,
            bio: user.bio,
            emailVerified: user.emailVerified,
            profilePicture: user.profilePicture,
            coverImage: user.coverImage,
            balance: user.balance,
          };
          // console.log("Setting user in store:", user);
          set({ user, minimalUser });
        }
      },

      clearToken: () => {
        set({ accessToken: null, user: null, minimalUser: null });
        window.location.href = "/auth/login";
      },
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        minimalUser: state.minimalUser, // Only persist minimal data
      }),
    }
  )
);

export default useAuthStore;
