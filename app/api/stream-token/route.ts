import { StreamChat } from "stream-chat";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const api_key = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
    const api_secret = process.env.STREAM_SECRET_KEY!;

    const serverClient = StreamChat.getInstance(api_key, api_secret);

    if (!api_key || !api_secret) {
      throw new Error("Stream credentials are missing");
    }

    const token = serverClient.createToken(userId);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Could not generate token" },
      { status: 500 }
    );
  }
}
