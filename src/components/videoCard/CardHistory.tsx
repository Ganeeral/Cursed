import { DeleteItemIcon } from "@/ui/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Video } from "@/types/video";
import { formatRelativeDate } from "../format/formatDateMain";
import FormatWatch from "../format/formatWatch";

const CardHistory: React.FC<{ video: Video; index: number; deleteVideoFromHistory: (videoId: number) => void }> = ({
  video,
  index,
  deleteVideoFromHistory,
}) => {
  const relativeDate = formatRelativeDate(video.publication_date);

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteVideoFromHistory(video.video_id);
  };

  return (
    <div className="cardHistory flex justify-between w-full py-2 px-4 bg-searchText rounded-2xl hover:bg-hoveredCard">
      <Link href={`/watch/${video.video_id}`} className="flex gap-x-3 items-center w-full">
        <span className="text-lg text-sideText">{index + 1}</span>
        <Image
          src={video.preview}
          layout="responsive"
          width={100}
          height={100}
          alt=""
          className="object-center object-cover min-w-[140px] max-w-[140px] max-h-[92px] rounded-xl mobile:min-w-[190px] mobile:max-w-[190px] mobile:max-h-[112px]"
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-sideText overflow-hidden line-clamp-2">{video.title}</p>
          <p className="text-sideText text-sm overflow-hidden line-clamp-1">
            {`${video.author_username} • `}
            {`  ${relativeDate}`}
          </p>
        </div>
      </Link>
      <div className="deleteIcon mt-2 cursor-pointer duration-300 ml-4" onClick={handleDelete}>
        <DeleteItemIcon />
      </div>
    </div>
  );
};

export default CardHistory;
