import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { avatarImages } from "@/constants";

interface MeetingCardProps {
  icon: string;
  topic: string;
  desc?: string;
  date: string;
  link?: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleButton1: () => void;
}

const MeetingCard = ({
  icon,
  topic,
  desc,
  date,
  link,
  isPreviousMeeting,
  buttonIcon1,
  buttonText,
  handleButton1,
}: MeetingCardProps) => {
  const { toast } = useToast();
  const copyLink = () => {
    link && navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "The link has been copied to your clipboard",
    });
  };
  return (
    <section className="flex flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 min-h-[258px] w-full xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="schedule" width={24} height={24} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">{topic}</h1>
            <p className="text-md font-normal text-gray-400">
              {desc?.slice(0, 110)}
            </p>

            <span className="text-base font-normal text-sky-200">{date}</span>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative mt-3", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="avtar"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full bg-dark-4 border-dark-3 border-[5px]">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button className="rounded bg-blue-1 px-6" onClick={handleButton1}>
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button className="rounded bg-dark-4 px-6" onClick={copyLink}>
              {buttonIcon1 && (
                <Image
                  src={"/icons/copy.svg"}
                  alt="copy btn"
                  width={20}
                  height={20}
                />
              )}
              &nbsp; {"Copy Link"}
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
