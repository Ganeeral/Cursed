import Image from "next/image";
import React from "react";
import cn from "classnames";
import FormatSubs from "../format/formatSubs";
import SubscribeBtn from "@/ui/buttons/SubscribeBtn";
import LikeBtn from "@/ui/buttons/LikeBtn";
import ShareBtn from "@/ui/buttons/ShareBtn";
import FormatWatch from "../format/formatWatch";
import VideoDescription from "../videoDescription/videoDescription";
import { formatRelativeDate } from "../format/formatDateMain";
import Link from "next/link";
import { Video } from "@/types/video";
import LaterButton from "@/ui/buttons/LaterButton";
import ReportButton from "@/ui/buttons/ReportButton";

interface ChannelInfoProps {
  video: Video | null;
  currentUserId: number | null;
  channelId: number;
  isOwner: boolean;
  user: {
    login: string;
    subscribers: number;
    preview: string;
    author_avatar: string;
    username: string;
  };
}

const AboutWatch: React.FC<ChannelInfoProps> = ({
  user,
  video,
  currentUserId,
  channelId,
  isOwner,
}) => {
  if (!video) return null;
  const relativeDate = formatRelativeDate(video.publication_date);
  const userId = localStorage.getItem("user_id") || "";

  return (
    <div className={cn("flex w-full flex-col gap-y-3")}>
      <h3 className="text-xl leading-5 text-titleText text-wrap w-full overflow-hidden">
        {video.title}
      </h3>

      <div
        className={cn(
          "flex flex-col gap-y-4",
          "tablet:flex-row tablet:items-center"
        )}
      >
        <div className="video__footer max-h-[128px] w-full items-center gap-x-4 h-auto flex">
          <div className="h-[53px] w-[53px] rounded-full relative">
            <Link href={`/channel/${video.author_id}`}>
              <Image
                src={video.author_avatar || ""}
                alt=""
                fill
                className="rounded-full object-center object-cover"
              />
            </Link>
          </div>
          <div className="flex-grow tablet:flex-grow-0">
            <div className="flex justify-between gap-y-1 gap-x-10 flex-grow">
              <div className="flex flex-col">
                <p className="leading-5 tracking-[-0.03em] text-sideText">
                  {video.author}
                </p>
                <p className="text-xs mobile:text-sm leading-5 tracking-[-0.03em] text-sideText">
                  <FormatSubs video={video} />
                </p>
              </div>
              {!isOwner && (
                <SubscribeBtn
                  subscriberId={currentUserId!}
                  channelId={channelId}
                  isOwner={isOwner}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-x-3 flex-wrap tablet:flex-nowrap gap-y-3">
          <LikeBtn videoId={video.id} userId={parseInt(userId, 10)} />
          <ShareBtn />
          {!isOwner && <LaterButton video={video} />}

          <ReportButton videoId={video.id} userId={userId} />
        </div>
      </div>

      <div
        className={cn(
          "bg-searchText rounded-xl w-full max-w-[866px] mt-4 p-3",
          "flix:mt-7"
        )}
      >
        <p className="flex gap-x-1 text-base leading-5 tracking-[-0.03em] text-titleText">
          <FormatWatch video={video} /> • {relativeDate}
        </p>

        <VideoDescription description={video.description} />
      </div>
    </div>
  );
};

export default AboutWatch;
