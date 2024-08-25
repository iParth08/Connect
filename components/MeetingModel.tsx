import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  classProperty?: string;
  buttonText: string;
  handleClick?: () => void;
  image?: string;
  btnIcon?: string;
  children?: ReactNode;
}
const MeetingModel = ({
  isOpen,
  onClose,
  title,
  description,
  classProperty,
  buttonText,
  handleClick,
  image,
  btnIcon,
  children,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-h-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image
                src={image}
                alt="add meeting"
                width={72}
                height={72}
                className="cursor-pointer"
              />
            </div>
          )}
          <h1
            className={cn("text-3xl font-bold leading-[42px]", classProperty)}
          >
            {title}
          </h1>
          <p className="text-lg font-normal">{description}</p>
          {children}
          <Button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {btnIcon && (
              <Image src={btnIcon} alt="button icon" width={13} height={13} />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModel;
