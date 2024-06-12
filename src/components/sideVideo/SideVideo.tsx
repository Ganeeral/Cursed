import React, { useEffect, useState } from "react";
import { formatRelativeDate } from "../format/formatDateMain";
import CardWatch from "../videoCard/CardWatch";
import { Video } from "@/types/video";

const SideVideo: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);


  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("http://Flixx/src/api/getVideos.php");
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setVideos(data);
        } else {
          console.error("Данные не получены или пусты");
        }
      } catch (error) {
        console.error("Ошибка получения данных:", error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="mt-[8px] flex flex-col gap-y-4">
      {videos.map((video: Video) => (
        <CardWatch
          key={video.id}
          video={video}
          relativeDate={formatRelativeDate(video.publication_date)}
        />
      ))}
    </div>
  );
};

export default SideVideo;
