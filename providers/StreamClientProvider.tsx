"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
// import { useUser } from "@clerk/nextjs";
// import { useUser } from "@/store/useUser";
import { useUserStore } from "@/store/use-user-store";

import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/streaming/Loader";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  // Clerk auth
  // const { user, isLoaded } = useUser();

  // Zustand store
  // const { user } = useUser();
  const { user } = useUserStore();

  useEffect(() => {
    // Clerk auth check
    // if (!isLoaded || !user) return;

    // Zustand check
    if (!user) return;
    if (!API_KEY) throw new Error("Stream API key is missing");

    const userId = user.id.toString();

    // Get or create the client instance
    const client = StreamVideoClient.getOrCreateInstance({
      apiKey: API_KEY,
      user: {
        // Clerk auth user
        // id: user?.id,
        // name: user?.username || user?.id,
        // image: user?.imageUrl,

        // Zustand store user
        id: userId,
        name: user.name,
        image: user.profilePicture || "",
      },
      tokenProvider: () => tokenProvider(userId),
    });

    setVideoClient(client);
    // }, [user, isLoaded]); // Clerk auth dependencies
  }, [user]); // Zustand store dependencies

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
