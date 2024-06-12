"use client";

import React, { useEffect, useState } from "react";
import ChannelPreviewSection from "@/sections/channelPreview/channelPreviewSection";
import CategorySliderAccount from "@/sections/categoryslider/categorySliderAccount";
import CardChannel from "@/components/videoCard/cardChannel";
import { Video } from "@/types/video";
import Link from "next/link";
import { User } from "@/types/user";
import ChannelPreview from "@/sections/channelPreview/channelPreview";

function Channel() {
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [video, setVideo] = useState<Video | null>(null);

useEffect(() => {
    async function fetchVideos() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }

      try {
        const response = await fetch("http://Flixx/src/api/getUsersVideos.php", {
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

    async function fetchUserDetails() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }
      try {
        const response = await fetch("http://Flixx/src/api/getUserDetails.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });
        const data = await response.json();
        if (data && !data.message) {
          setUser(data);
        } else {
          console.error("Пользователь не найден");
        }
      } catch (error) {
        console.error("Ошибка получения данных о пользователе:", error);
      }
    }

    fetchVideos();
    fetchUserDetails();
  }, []);


  const updateVideos = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("Пользователь не авторизован");
      return;
    }

    try {
      const response = await fetch("http://Flixx/src/api/getUsersVideos.php", {
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
  };

  return (
    <>
      {user && (
        <ChannelPreview user={user} video={video}/>
      )}
      <CategorySliderAccount />
      <div className="textGradient ml-8 mt-[40px] text-2xl">Видео</div>
      <div className="grid grid-cols-1 flix:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-6 m-2 flix:m-8">
        {videos.map((video: Video) => (
          <CardChannel
            key={video.id}
            video={video}
            updateVideos={updateVideos}
          />
        ))}
      </div>
    </>
  );
}

export default Channel;
