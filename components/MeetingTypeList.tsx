"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingModel from "./MeetingModel";
import Tiles from "./Tiles";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetigState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);

  const createMeeting = () => {};

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2  xl:grid-cols-4">
      <Tiles
        img="icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting."
        bgcolor="bg-orange-1"
        handleClick={() => setMeetigState("isInstantMeeting")}
      />
      <Tiles
        img="icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting."
        bgcolor="bg-blue-1"
        handleClick={() => setMeetigState("isScheduleMeeting")}
      />
      <Tiles
        img="icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings."
        bgcolor="bg-purple-1"
        handleClick={() => router.push("/recordings")}
      />
      <Tiles
        img="icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link."
        bgcolor="bg-yellow-1"
        handleClick={() => setMeetigState("isJoiningMeeting")}
      />
      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetigState(undefined)}
        title="Instant Meeting"
        description="Start an instant meeting. You can join from any device."
        classProperty="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
