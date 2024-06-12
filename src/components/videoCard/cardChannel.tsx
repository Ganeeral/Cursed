"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TrashIcon, PenciIcon } from "@/ui/icons/index";
import Link from "next/link";
import DeleteModal from "../deleteModal/DeleteModal";
import { Video } from "@/types/video";
import { formatRelativeDate } from "../format/formatDateMain";
import FormatWatch from "../format/formatWatch";

const Card: React.FC<{ video: Video; updateVideos: () => void }> = ({
  video,
  updateVideos,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const relativeDate = formatRelativeDate(video.publication_date);
  const handleDeleteVideo = async () => {
    try {
      const response = await fetch(
        `http://Flixx/src/api/deleteVideos.php?id=${video.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        updateVideos();
        setIsModalOpen(false);
      } else {
        console.error("Не удалось удалить видео!");
      }
    } catch (error) {
      console.error("Ошибка удаления видео:", error);
    }
  };

  return (
    <>
      <div className="">
        <Link href={`/watch/${video.id}`}>
          <div className="">
            <div className="max-w-[513px] w-full mx-auto rounded-2xl">
              <div className="max-h-[209px] min-h-[209px] w-full rounded-t-2xl h-auto">
                <Image
                  src={video.preview}
                  alt=""
                  layout="responsive"
                  width={100}
                  height={100}
                  className="rounded-2xl object-center object-cover max-h-[209px] min-h-[209px]"
                />
              </div>
              <div className="video__footer gap-y-4 max-h-[128px] flex-col h-auto py-6 px-4 flex flex-grow">
                <div className="gap-x-4 px-4 flex">
                  <div className="h-10 w-10 rounded-full relative">
                    <Image
                      src={video.author_avatar}
                      alt=""
                      fill
                      className="rounded-full object-center object-cover w-[40px]"
                    />
                  </div>
                  <div className="video__content flex flex-col gap-y-1 flex-grow">
                    <div className="flex flex-col">
                      <h6 className="video__title text-base text-titleText leading-5 font-bold overflow-ellipsis line-clamp-2">
                        {video.title}
                      </h6>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs leading-5 tracking-[-0.03em] text-sideText">
                        {video.username}
                      </p>
                      <p className="text-xs leading-5 tracking-[-0.03em] text-sideText">
                        <FormatWatch video={video} /> • {relativeDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className=" flex justify-center gap-x-[48px] w-full">
          <Link href={`/edit/${video.id}`}>
            <div className="cursor-pointer card__btn items-center text-white gap-x-1 text-xs flex py-[5px] rounded-md px-[14px]">
              <PenciIcon size={20} />
              <span>Редактировать</span>
            </div>
          </Link>

          <div
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer card__btn items-center text-white gap-x-1 text-xs flex py-[5px] rounded-md px-[32px]"
          >
            <TrashIcon />
            <span>Удалить</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <DeleteModal
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDeleteVideo}
        />
      )}
    </>
  );
};

export default Card;
