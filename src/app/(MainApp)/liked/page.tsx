"use client";

import React, { useEffect, useState } from "react";
import { Video } from "@/types/video";
import CardLiked from "@/components/videoCard/CardLiked";

const Liked = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    async function fetchLikedVideos() {
      try {
        const response = await fetch(
          "http://Flixx/src/api/getLikedVideos.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error("Данные не получены или пусты");
        }
      } catch (error) {
        console.error("Ошибка получения данных:", error);
      }
    }

    fetchLikedVideos();
  }, [userId]);

  return (
    <div className="flex flex-col gap-y-4 mx-2 tablet-s:mx-10">
      <h1 className="textGradient text-4xl font-bold mt-4 flix:mt-10">
        Понравившиеся
      </h1>
      <div className="flex flex-col gap-y-4 w-full">
        {videos.length > 0 ? (
          videos.map((video: Video, index) => (
            <CardLiked key={video.id} video={video} index={index} />
          ))
        ) : (
          <p className="text-lg textGradient text-center mt-4">
            У вас нет понравившихся видео
          </p>
        )}
      </div>
    </div>
  );
};

export default Liked;
