"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <div>
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetUpComplete ? (
              <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
            ) : (
              <MeetingRoom />
            )}
          </StreamTheme>
        </StreamCall>
      </div>
    </main>
  );
};

export default Meeting;
