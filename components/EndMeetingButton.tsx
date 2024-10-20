"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const EndMeetingButton = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const router = useRouter();
  const { toast } = useToast();

  const endMeeting = async () => {
    if (!call) return;
    await call?.endCall();
    router.push("/");

    toast({
      title: "Meeting Ended",
      description: "The meeting has been ended",
    });
  };

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    call?.state.createdBy.id === localParticipant.userId;

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <Button
      onClick={() => endMeeting}
      className="bg-red-500 text-white hover:bg-red-700"
    >
      End Meeting for Everyone
    </Button>
  );
};

export default EndMeetingButton;
