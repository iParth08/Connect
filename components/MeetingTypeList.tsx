"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MeetingModel from "./MeetingModel";
import Tiles from "./Tiles";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";

import DatePicker from "react-datepicker";

const MeetingTypeList = () => {
  const [meetingState, setMeetigState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);

  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    topic: "",
    description: "",
    link: "",
    invite: "",
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

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            topic: values.topic || "Unnamed Meeting",
            description: values.description || "No description",
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

      {/* Schedule Meeting Model */}
      {!callDetails ? (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetigState(undefined)}
          title="Create Meeting"
          description="Schedule a new meeting. Join later with the link."
          classProperty="text-center"
          buttonText="Schedule Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label htmlFor="meet-topic">Meeting Topic</label>
            <input
              type="text"
              name="topic"
              id="meet-topic"
              className="w-full rounded-lg border-none outline-none bg-dark-3 p-3 text-base text-normal leading-[22px] text-sky-200"
              onChange={(e) => setValues({ ...values, topic: e.target.value })}
            />

            <label
              htmlFor="meet-desc"
              className="text-base text-normal leading-[22px]"
            >
              Description
            </label>
            <Textarea
              name="description"
              id="meet-desc"
              className="w-full rounded-lg border-none outline-none bg-dark-3 p-3 text-base text-normal leading-[22px] text-sky-200 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="w-full flex flex-col gap-2.5">
            <label
              htmlFor="meet-dateTime"
              className="text-base text-normal leading-[22px]"
            >
              Select Date and Time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded-lg border-none outline-none bg-dark-3 p-3 text-base text-normal leading-[22px] text-sky-200 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetigState(undefined)}
          title="Meeting Scheduled"
          description="Your meeting has been scheduled. Join later with the link."
          classProperty="text-center"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
            );
            toast({
              title: "Meeting Link Copied",
              description: "Join the meeting from Join Meeting section.",
            });
          }}
          image="/icons/checked.svg"
          btnIcon="icons/copy.svg"
        />
      )}

      {/* Instant Meeting Model */}
      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetigState(undefined)}
        title="Instant Meeting"
        description="Start an instant meeting. You can join from any device."
        classProperty="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      {/* Join Meeting Model */}
      <MeetingModel
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetigState(undefined)}
        title="Join Meeting"
        description="Paste the invite link to join the meeting"
        classProperty="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.invite!)}
      >
        <div>
          <label htmlFor="invite">Invite Link</label>
          <input
            type="text"
            name="invite"
            id="invite"
            className="w-full rounded-lg border-none outline-none bg-dark-3 p-3 text-base text-normal leading-[22px] text-sky-200"
            onChange={(e) => setValues({ ...values, invite: e.target.value })}
          />
        </div>
      </MeetingModel>
    </section>
  );
};

export default MeetingTypeList;
