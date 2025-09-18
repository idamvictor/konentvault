import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useStreamControls } from "@/store/streamControlsStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Settings } from "lucide-react";

export const StreamControlsPanel = () => {
  const {
    showRecord,
    showCallStats,
    showScreenShare,
    showEndCallForAll,
    toggleRecord,
    toggleCallStats,
    toggleScreenShare,
    toggleEndCallForAll,
  } = useStreamControls();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
        <Settings size={20} className="text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] bg-[#19232d] text-white border-dark-1">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="record">Record</Label>
            <Switch
              id="record"
              checked={showRecord}
              onCheckedChange={toggleRecord}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="callStats">Call Statistics</Label>
            <Switch
              id="callStats"
              checked={showCallStats}
              onCheckedChange={toggleCallStats}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="screenShare">Screen Sharing</Label>
            <Switch
              id="screenShare"
              checked={showScreenShare}
              onCheckedChange={toggleScreenShare}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="endCall">End Call for All</Label>
            <Switch
              id="endCall"
              checked={showEndCallForAll}
              onCheckedChange={toggleEndCallForAll}
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
