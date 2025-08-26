"use client";

import { useState } from "react";
// import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";

import { useGetCallById } from "@/hooks/streaming/useGetCallById";
import Alert from "@/components/streaming/Alert";
import MeetingSetup from "@/components/streaming/MeetingSetup";
import MeetingRoom from "@/components/streaming/MeetingRoom";
// import { useUser } from "@/store/useUser";
import { useUserStore } from "@/store/use-user-store";

const MeetingPage = () => {
  const { id } = useParams();
  // const { isLoaded, user } = useUser();
  // const { user } = useUser();
  const { user } = useUserStore();
  const { call, isCallLoading } = useGetCallById(id as string);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (isCallLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed =
    call.type === "invited" &&
    (!user ||
      !call.state.members.find((m) => m.user.id === user.id.toString()));

  if (notAllowed)
    return <Alert title="You are not allowed to join this meeting" />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
