"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "./ui/label";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetUpComplete,
}: {
  setIsSetUpComplete: (value: boolean) => void;
}) => {
  // permission check
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  //   getting call from stream-call as it is already created
  const call = useCall();

  if (!call)
    throw new Error("useCall must be used within a streamCall component");

  useEffect(() => {
    // Camera check
    if (isCameraEnabled) {
      call?.camera.enable();
    } else {
      call?.camera.disable();
    }

    // Mic check
    if (isMicEnabled) {
      call?.microphone.enable();
    } else {
      call?.microphone.disable();
    }
  }, [isCameraEnabled, isMicEnabled, call?.camera, call?.microphone]);
  return (
    <div className="h-screen w-full flex-center flex-col gap-3 text-white">
      <h1 className="text-3xl font-bold mb-5">Meeting Setup</h1>
      <div className="flex w-[90%] justify-between items-center">
        {/* Preview */}
        <div className="w-[900px] min-h-[510px] flex-center border-2 bg-slate-200">
          {isCameraEnabled ? (
            <VideoPreview />
          ) : (
            <>
              <div className="flex flex-col items-center space-y-3">
                <Skeleton className="h-[250px] w-[360px] rounded-xl bg-white" />
                <div className="flex flex-col  items-center space-y-2">
                  <Skeleton className="h-4 w-[250px] bg-zinc-800" />
                  <Skeleton className="h-4 w-[200px] bg-zinc-600" />
                </div>
              </div>
            </>
          )}
        </div>
        {/* Details */}
        <div className="h-[500px] w-[520px] bg-green-300">DETAILS</div>
      </div>

      {/* controls & Settings */}
      <div className="w-[80%] h-[120px] flex justify-between items-center px-[2rem]">
        <div className="flex-center gap-16 h-full">
          <div className="flex items-center space-x-2">
            <Switch
              id="Camera"
              className={`${isCameraEnabled ? "bg-green-400" : "bg-red-500"}`}
              checked={isCameraEnabled}
              onCheckedChange={() => setIsCameraEnabled(!isCameraEnabled)}
            />
            <Label htmlFor="Camera" className="text-lg">
              {isCameraEnabled ? "Camera On" : "Camera Off"}
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="Mic"
              className={`${isMicEnabled ? "bg-green-400" : "bg-red-500"}`}
              checked={isMicEnabled}
              onCheckedChange={() => setIsMicEnabled(!isMicEnabled)}
            />
            <Label htmlFor="Mic" className="text-lg">
              {isMicEnabled ? "Microphone On" : "Microphone Off"}
            </Label>
          </div>

          <div>
            {/* <Settings className="w-[30px] h-[30px]" /> */}
            <DeviceSettings />
          </div>
        </div>

        <Button
          className="bg-green-400 hover:bg-green-600 text-white text-lg p-8 font-semibold"
          onClick={() => {
            call?.join();
            setIsSetUpComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;

// TODO: Preapare participant list, camera and mic
