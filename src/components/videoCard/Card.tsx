import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FormatWatch from "@/components/format/formatWatch";
import { formatRelativeDate } from "../format/formatDateMain";
import { Video } from "@/types/video";

const Card: React.FC<{ video: Video }> = ({ video }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  const relativeDate = formatRelativeDate(video.publication_date);

  return (
    <Link href={`/watch/${video.id}`}>
      <div className="max-w-[513px] w-full mx-auto rounded-2xl">
        {isLoading ? (
          <div className="max-h-[209px] min-h-[209px] w-full rounded-2xl h-auto bg-searchText animate-pulse"></div>
        ) : (
          <div className="max-h-[209px] min-h-[209px] w-full rounded-2xl h-auto">
            <Image
              src={video.preview}
              alt=""
              layout="responsive"
              width={100}
              height={100}
              className="rounded-2xl object-center object-cover max-h-[209px] min-h-[209px]"
            />
          </div>
        )}
        <div className="video__footer max-h-[128px] gap-x-4 h-auto py-6 px-4 flex flex-grow">
          <div className="h-10 w-10 rounded-full relative">
            {isLoading ? (
              <div className="h-10 w-10 rounded-full bg-searchText animate-pulse"></div>
            ) : (
              <Image
                src={video.author_avatar}
                alt=""
                fill
                className="rounded-full object-center object-cover w-[40px]"
              />
            )}
          </div>
          <div className="video__content flex flex-col gap-y-1 flex-grow">
            <div className="flex flex-col">
              {isLoading ? (
                <h6 className="video__title text-titleText text-base leading-5 font-bold overflow-ellipsis line-clamp-2 rounded-xl bg-searchText h-6 animate-pulse"></h6>
              ) : (
                <h6 className="video__title text-titleText text-base leading-5 font-bold overflow-ellipsis line-clamp-2">
                  {video.title}
                </h6>
              )}
            </div>
            <div className="flex flex-col">
              <p className="text-xs leading-5 tracking-[-0.03em] text-sideText">
                {isLoading ? (
                  <span className="bg-searchText h-4 w-[120px] animate-pulse rounded-xl"></span>
                ) : (
                  video.author
                )}
              </p>
              <p className="flex gap-x-1 text-xs leading-5 tracking-[-0.03em] text-sideText">
                {isLoading ? (
                  <span className="bg-searchText h-4 w-[120px] animate-pulse rounded-xl"></span>
                ) : (
                  <>
                    <FormatWatch video={video} /> • {relativeDate}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
