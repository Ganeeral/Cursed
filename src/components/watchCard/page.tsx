import React, { useState } from "react";
import Image from "next/image";

interface Video {
  preview: string;
  videoUrl: string;
}

const WatchCard: React.FC<Video> = ({ preview, videoUrl }) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="relative rounded-lg">
      {showVideo ? (
        <div className="min-h-[240px]">
          <iframe
            src={videoUrl}
            title="Видео"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full object-cover rounded-xl h-full min-h-[200px] border-0"
          ></iframe>
        </div>
      ) : (
        <div
          className="cursor-pointer"
          onClick={!showVideo ? handleVideoClick : undefined}
        >
          <Image
            src={preview}
            alt=""
            layout="responsive"
            width={100}
            height={100}
            className="rounded-xl object-center object-cover min-h-[200px]"
          />
        </div>
      )}
    </div>
  );
};

export default WatchCard;
