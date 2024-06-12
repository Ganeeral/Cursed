import React, { useState, useEffect } from "react";
import { LaterWhiteIcon } from "@/ui/icons";
import { Video } from "@/types/video";

const LaterButton: React.FC<{ video: Video }> = ({ video }) => {
  const userId = localStorage.getItem("user_id");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    async function checkIfSaved() {
      try {
        const response = await fetch("http://Flixx/src/api/checkWatchLater.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, video_id: video.id }),
        });
        const data = await response.json();
        setIsSaved(data.isSaved);
      } catch (error) {
        console.error("Ошибка проверки статуса видео:", error);
      }
    }

    checkIfSaved();
  }, [userId, video.id]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    const url = isSaved
      ? "http://Flixx/src/api/removeFromWatchLater.php"
      : "http://Flixx/src/api/addToWatchLater.php";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, video_id: video.id }),
      });
      const data = await response.json();

      if (data.success) {
        setIsSaved(!isSaved);
      } else {
        console.error("Ошибка обновления статуса видео:", data.message);
      }
    } catch (error) {
      console.error("Ошибка обновления статуса видео:", error);
    }
  };

  return (
    <button
      onClick={handleSave}
      className="rounded-lg cursor-pointer gradientBtn px-4 py-1 flex justify-center items-center gap-x-3"
    >
      <LaterWhiteIcon />
      <span className="hidden text-xs text-white leading-4 lg-mobile:block">
        {isSaved ? "Сохранено" : "Сохранить"}
      </span>
    </button>
  );
};

export default LaterButton;
