"use client";

import { useState } from "react";
import {
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ScreenShareButton,
  CancelCallButton,
  RecordCallButton,
  // CallControls,
} from "@stream-io/video-react-sdk";
import { useStreamControls } from "@/store/streamControlsStore";
import { StreamControlsPanel } from "./StreamControlsPanel";
import { useRouter, useSearchParams } from "next/navigation";
import { Users, LayoutList, MessageCircle } from "lucide-react";
import { StreamChatComponent } from "./StreamChatComponent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Loader from "./Loader";
import EndCallButton from "./EndCallButton";
import { cn } from "@/lib/utils";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const {
    showRecord,
    showCallStats,
    showScreenShare,
    showEndCallForAll,
    showChat,
    toggleChat,
  } = useStreamControls();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div
          className={cn("flex size-full max-w-[1000px] items-center", {
            "max-w-[800px]": showChat,
          })}
        >
          <CallLayout />
        </div>
        {showChat && (
          <div className="w-[300px] h-[calc(100vh-86px)] ml-2 bg-[#1a1a1a] border-l border-[#2a2a2a]">
            <StreamChatComponent />
          </div>
        )}
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        {/* Original CallControls implementation: */}
        {/* <CallControls 
          onLeave={() => router.push(`/streaming`)}
        /> */}
        <div className="flex items-center gap-2">
          <ToggleAudioPublishingButton />
          <ToggleVideoPublishingButton />
          {showScreenShare && <ScreenShareButton />}
          {showRecord && <RecordCallButton />}
          <CancelCallButton onLeave={() => router.push(`/streaming`)} />
          <button
            onClick={toggleChat}
            className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]"
          >
            <MessageCircle size={20} className="text-white" />
          </button>
        </div>
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {showCallStats && <CallStatsButton />}
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && showEndCallForAll && <EndCallButton />}
      </div>

      {/* Add the controls panel */}
      <div className="fixed top-4 right-4">
        <StreamControlsPanel />
      </div>
    </section>
  );
};

export default MeetingRoom;
