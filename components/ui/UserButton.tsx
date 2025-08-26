"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import Image from "next/image";

const UserButton = () => {
  const { user } = useUserStore();
  const router = useRouter();

  if (!user) return null;

  return (
    <button
      onClick={() => router.push("/profile")}
      className="flex items-center gap-2"
    >
      <div className="relative h-8 w-8 overflow-hidden rounded-full">
        {user.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt={user.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-300">
            <span className="text-lg font-semibold text-gray-600">
              {user.name[0]}
            </span>
          </div>
        )}
      </div>
      <span className="hidden text-sm text-white md:block">{user.name}</span>
    </button>
  );
};

export default UserButton;
