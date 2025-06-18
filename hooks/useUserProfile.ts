import { fetchUserProfile } from "@/services/user/user-services";
import { useUserStore } from "@/store/use-user-store";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  const setUser = useUserStore((state) => state.setUser);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const userData = await fetchUserProfile();
      setUser(userData); // Update the user store with the fetched data
      return userData;
    },
  });

  return {
    user,
    isLoading,
    error,
  };
};
