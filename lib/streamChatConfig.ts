import { StreamChat } from "stream-chat";

// Stream credentials from environment variables
const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

// Default channel configuration
export const DEFAULT_CHANNEL_CONFIG = {
  type: "livestream",
  data: {
    name: "Live Stream Chat",
    image:
      "https://getstream.io/random_svg/?id=cool-math-class&name=Live+Stream+Chat",
  },
};

// Create a Stream Chat client
export const chatClient = StreamChat.getInstance(STREAM_API_KEY);

// Initialize user
export const initializeUser = async () => {
  try {
    // Fetch token from our API route
    const response = await fetch("/api/stream-token");
    const { token, user } = await response.json();

    if (!token) throw new Error("Failed to get token");

    await chatClient.connectUser(user, token);
    return true;
  } catch (error) {
    console.error("Failed to connect user:", error);
    return false;
  }
};

// Create or join a channel
export const initializeChannel = async () => {
  try {
    const channel = chatClient.channel(
      DEFAULT_CHANNEL_CONFIG.type,
      "live-stream-channel",
      DEFAULT_CHANNEL_CONFIG.data
    );
    await channel.watch();
    return channel;
  } catch (error) {
    console.error("Failed to create/join channel:", error);
    return null;
  }
};
