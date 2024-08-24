"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetigState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const Tiles = ({
    img,
    description,
    title,
    bgcolor,
    handleClick,
  }: {
    img: string;
    description: string;
    title: string;
    bgcolor: string;
    handleClick: () => void;
  }) => {
    return (
      <div
        className={cn(
          `flex flex-col py-6 px-4 justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`,
          bgcolor
        )}
        onClick={handleClick}
      >
        <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">
          <Image src={img} alt="add meeting" width={27} height={27} />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-lg font-normal">{description}</p>
        </div>
      </div>
    );
  };
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
    </section>
  );
};

export default MeetingTypeList;
