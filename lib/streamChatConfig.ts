import { StreamChat } from "stream-chat";

// Stream credentials from environment variables
const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

import { ChannelData } from "stream-chat";

// Default channel configuration
export const DEFAULT_CHANNEL_CONFIG = {
  type: "livestream",
  data: {
    name: "Live Stream Chat",
    image:
      "https://getstream.io/random_svg/?id=cool-math-class&name=Live+Stream+Chat",
  } as ChannelData,
};

// Create a Stream Chat client
export const chatClient = StreamChat.getInstance(STREAM_API_KEY);

// Initialize user with video call identity
export const initializeUser = async (
  userId: string,
  userName: string,
  userImage?: string
) => {
  try {
    // Fetch token from our API route with userId
    const response = await fetch(
      `/api/stream-token?userId=${encodeURIComponent(userId)}`
    );
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.error || "Failed to get token");
    }

    if (!data.token) {
      throw new Error("Token not received from server");
    }

    const token = data.token;

    await chatClient.connectUser(
      {
        id: userId,
        name: userName,
        image: userImage || "",
      },
      token
    );
    return true;
  } catch (error) {
    console.error("Failed to connect user:", error);
    return false;
  }
};

// Create or join a channel for a specific call
export const initializeChannel = async (callId: string) => {
  try {
    const channel = chatClient.channel(
      DEFAULT_CHANNEL_CONFIG.type,
      `call-${callId}`,
      {
        ...DEFAULT_CHANNEL_CONFIG.data,
        name: `Call Chat ${callId}`,
      } as ChannelData
    );
    await channel.watch();
    return channel;
  } catch (error) {
    console.error("Failed to create/join channel:", error);
    return null;
  }
};
