"use client";

import React, { useEffect, useState } from "react";
import { TrashHistoryIcon, DeleteItemIcon } from "@/ui/icons";
import cn from "classnames";
import { Video } from "@/types/video";
import CardHistory from "@/components/videoCard/CardHistory";
import HistoryHead from "@/components/historyHead/HistoryHead";

const History = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("http://Flixx/src/api/getWatchHistory.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });
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
  }, [userId]);

  const deleteVideoFromHistory = async (videoId: number) => {
    try {
      const response = await fetch("http://Flixx/src/api/deleteVideoFromHistory.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, video_id: videoId }),
      });
      const data = await response.json();

      if (data.success) {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
      } else {
        console.error("Ошибка удаления видео из истории:", data.message);
      }
    } catch (error) {
      console.error("Ошибка удаления видео из истории:", error);
    }
  };

  const clearHistory = async () => {
    try {
      const response = await fetch("http://Flixx/src/api/clearHistory.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await response.json();

      if (data.success) {
        setVideos([]);
      } else {
        console.error("Ошибка очистки истории:", data.message);
      }
    } catch (error) {
      console.error("Ошибка очистки истории:", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 mx-2 tablet-s:mx-10">
      <HistoryHead clearHistory={clearHistory} />

      <div className="flex flex-col gap-y-4 w-full">
        {videos.length > 0 ? (
          videos.map((video: Video, index) => (
            <CardHistory key={video.id} video={video} index={index} deleteVideoFromHistory={deleteVideoFromHistory} />
          ))
        ) : (
          <p className="text-lg text-center mt-4 textGradient">У вас нет истории просмотров</p>
        )}
      </div>
    </div>
  );
};

export default History;
