import Image from "next/image";
import React, { useState } from "react";
import cn from "classnames";
import FormatWatch from "../format/formatWatch";
import Link from "next/link";
import { Video } from "@/types/video";

interface CardWatchProps {
  video: Video;
  relativeDate: string;
}

const CardWatch: React.FC<CardWatchProps> = ({ video, relativeDate }) => {
  return (
    <Link className="max-w-[420px] mobile:max-w-full desktop:w-[420px] w-full" href={`/watch/${video.id}`}>
      <div
        className={cn(
          "flex items-center max-w-[420px] w-full gap-x-3 overflow-hidden",
          "mobile:max-w-full",
          "desktop:max-w-[420px]"
        )}
      >
        <div className="w-[170px] mobile:w-[190px] flix:w-[214px]">
          <Image
            src={video.preview}
            alt=""
            layout="responsive"
            width={100}
            height={100}
            className={cn(
              "rounded-2xl min-w-[170px] min-h-[114px] max-h-[114px] object-center object-cover",
              "mobile:w-[190px] mobile:min-h-[134px] mobile:min-w-[190px]",
              "flix:w-[214px] flix:min-w-[214px]"
            )}
          />
        </div>

        <div
          className={cn(
            "flex flex-col max-w-[220px] overflow-hidden gap-y-[8px]",
            "mobile:max-w-full",
            "desktop:max-w-[220px]"
          )}
        >
          <h4 className="text-sm leading-5 text-titleText">
            {video.title}
          </h4>

          <div>
            <p className="text-sm leading-5 tracking-[-0.03em] text-sideText">
              {video.author}
            </p>
            <p className="flex gap-x-1 text-sm leading-5 tracking-[-0.03em] text-sideText">
              <FormatWatch video={video} /> • {relativeDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardWatch;
