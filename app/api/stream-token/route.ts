import { StreamChat } from "stream-chat";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
    const api_secret = process.env.STREAM_SECRET_KEY!;

    const serverClient = StreamChat.getInstance(api_key, api_secret);

    // For testing, using a static user
    const user = {
      id: "john-doe-123",
      name: "John Doe",
      image: "https://getstream.io/random_image?id=john-doe&name=John+Doe",
    };

    const token = serverClient.createToken(user.id);

    return NextResponse.json({
      token,
      user,
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Could not generate token" },
      { status: 500 }
    );
  }
}
