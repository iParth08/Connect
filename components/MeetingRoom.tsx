import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
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
import Loader from "./Loader";
import NavBar from "./NavBarHide";
import { useRouter } from "next/navigation";

type CallLayoutType = "speaker-left" | "speaker-right" | "grid";

const MeetingRoom = () => {
  const router = useRouter();
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal"); //get boolean true from truthy

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

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
      <NavBar>
        <nav className="relative w-full h-[80px] bg-[rgba(0,0,0,0.5)] px-5 grid place-items-center grid-cols-3">
          <h1 className="text-[26px] font-extrabold text-white max-sm:hidden">
            Connect
          </h1>
          <span>Avengers Meeting, Join Code</span>
          <div className="p-5 flex justify-between items-center gap-3">
            <CallStatsButton />
            <Button className="hover:bg-green-500">Link To Share</Button>
            {!isPersonalRoom && <EndMeetingButton />}
          </div>
        </nav>
      </NavBar>

      <div className="size-full relative flex-center gap-5">
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

      <div className="fixed bottom-2 flex-center w-full gap-5 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />

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
