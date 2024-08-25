"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

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

export default Tiles;
