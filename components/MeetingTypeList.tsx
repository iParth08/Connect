"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingModel from "./MeetingModel";
import Tiles from "./Tiles";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetigState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Failed to create meeting",
          description: "Please select a date and time.",
          variant: "destructive",
        });
        return;
      }

      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      if (!call) throw new Error("Failed! call not created.");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant Meeting.";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);
      toast({
        title: "Meeting Scheduled",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });

      if (!values.description) router.push(`/meeting/${callId}`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
        description: "Please try again.",
        variant: "destructive",
      });
    }
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
