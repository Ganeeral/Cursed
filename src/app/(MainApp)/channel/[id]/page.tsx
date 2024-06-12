"use client"

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import { useRouter } from "next/router";
import ChannelPreviewSection from "@/sections/channelPreview/channelPreviewSection";
import CategorySliderAccount from "@/sections/categoryslider/categorySliderAccount";
import CardChannel from "@/components/videoCard/cardChannel";
import AboutWatch from "@/components/aboutWatch/AboutWatch";
import { Video } from "@/types/video";
import { User } from "@/types/user";
import Card from "@/components/videoCard/Card";
import SubscribeButton from "@/ui/buttons/SubscribeButton";

const Channel = () => {
  const params = useParams()
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [video, setVideo] = useState<Video | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVideos = async () => {
      try {
        const response = await fetch("http://flixx/src/api/getUsersVideos.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: id }),
        });

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setVideos(data);
          setVideo(data[0]); 
        } else {
          console.error("Данные не получены или пусты");
        }
      } catch (error) {
        console.error("Ошибка получения данных:", error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://flixx/src/api/getUserDetails.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: id }),
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
    };

    const fetchCurrentUser = async () => {
        const userId = localStorage.getItem("user_id");
        if (userId) {
          setCurrentUserId(parseInt(userId, 10));
        }
      };

    fetchVideos();
    fetchUserDetails();
  }, [id]);

  const updateVideos = async () => {
    try {
      const response = await fetch("http://flixx/src/api/getUsersVideos.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id }),
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

  if (!id) {
    return <div>Loading...</div>;
  }

  const isOwner = currentUserId === Number(id);

  return (
    <>
      {user && (
        <ChannelPreviewSection user={user} video={videos[0] || null} currentUserId={currentUserId} channelId={Number(id)} isOwner={isOwner} />
      )}
      <CategorySliderAccount />
      <div className="textGradient ml-8 mt-[40px] text-2xl">Видео</div>
      <div className="grid grid-cols-1 flix:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-6 m-2 flix:m-8">
        {videos.map((video: Video) => (
          <Card key={video.id} video={video}  />
        ))}
      </div>
    </>
  );
};

export default Channel;
