import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import EndMeetingButton from "./EndMeetingButton";

type CallLayoutType = "speaker-left" | "speaker-right" | "grid";

const MeetingRoom = () => {
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal"); //get boolean true from truthy
  const CallLayout = () => {
    switch (layout) {
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition={"right"} />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <PaginatedGridLayout />;
    }
  };
  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      <nav className="relative w-full h-[80px] bg-[rgba(0,0,0,0.5)] px-5 grid place-items-center grid-cols-3">
        <h1>Connect</h1>
        <span>Avengers Meeting, Join Code</span>
        <div className="p-5 flex justify-between items-center">
          <CallStatsButton />
          <Button>Link To Share</Button>
          {!isPersonalRoom && <EndMeetingButton />}
        </div>
      </nav>

      <div className="mt-5 relative flex-center gap-5 ">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>

        <div
          className={cn("h-[calc(100vh-120px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex-center w-full gap-5">
        <CallControls />

        <DropdownMenu>
          <div className="flex-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232D] hover:bg-[#4C535B] p-4">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white ">
            {["Speaker-Left", "Speaker-Right", "Grid"].map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => setlayout(item.toLowerCase() as CallLayoutType)}
                className="cursor-pointer hover:bg-slate-800"
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          className="cursor-pointer rounded-2xl bg-[#19232D] hover:bg-[#4C535B] p-4"
          onClick={() => setShowParticipants((prev) => !prev)}
        >
          <User size={20} className="text-white" />
        </button>
      </div>
    </section>
  );
};

export default MeetingRoom;
