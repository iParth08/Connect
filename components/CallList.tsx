"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "@/hooks/use-toast";

const CallList = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isCallLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  // find the execution location
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };

  const getNoCallsMsgs = () => {
    switch (type) {
      case "upcoming":
        return "No Upcoming Calls";
      case "ended":
        return "No Calls have been attended";
      case "recordings":
        return "No Recordings. Record a call to see it here.";
      default:
        return "Oops! Something went wrong.";
    }
  };

  const getIcons = () => {
    switch (type) {
      case "upcoming":
        return "/icons/upcoming.svg";
      case "ended":
        return "/icons/previous.svg";
      case "recordings":
        return "/icons/recordings.svg";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMsg = getNoCallsMsgs();
  const icon = getIcons();

  const handleButton1 = (call: Call | CallRecording) => {
    switch (type) {
      case "upcoming":
        router.replace(`/meeting/${(call as Call)?.id}`);
        break;
      case "recordings":
        router.replace(`${(call as CallRecording)?.url}`);
    }
  };

  //   Recordings
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast({
          title: "Failed to fetch recordings",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isCallLoading) {
    return <Loader />;
  }

  return (
    <div className="grid  grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((call: Call | CallRecording) => (
          <MeetingCard
            key={(call as Call).id}
            icon={icon}
            topic={
              (call as Call)?.state?.custom?.topic ||
              (call as CallRecording).filename?.substring(0, 20) ||
              "Untitled Meeting"
            }
            desc={(call as Call)?.state?.custom?.description || " "}
            date={
              (call as Call).state?.startsAt?.toUTCString() ||
              (call as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start Meeting"}
            link={
              type === "recordings"
                ? (call as CallRecording)?.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (call as Call)?.id
                  }`
            }
            handleButton1={() => handleButton1(call)}
          />
        ))
      ) : (
        <h2 className="text-2xl font-bold text-slate-500">{noCallsMsg}</h2>
      )}
    </div>
  );
};

export default CallList;
