"use client";
import ChannelPreviewSection from "@/sections/channelPreview/channelPreviewSection";
import CategorySliderAccount from "@/sections/categoryslider/categorySliderAccount";
import React, { useEffect, useState } from "react";
import SubCard from "@/components/videoCard/subCard";
import { Video } from "@/types/video";
import Link from "next/link";
import { User } from "@/types/user";
import ChannelPreview from "@/sections/channelPreview/channelPreview";

const Subscriptions = () => {
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    async function fetchUserSubscriptions() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }
      try {
        const response = await fetch(
          "http://Flixx/src/api/getUserSubscriptions.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );
        const data = await response.json();
        if (data && Array.isArray(data.subscriptions)) {
          setVideos(data.subscriptions);
        } else {
          console.error("Подписки пользователя не найдены");
        }
      } catch (error) {
        console.error(
          "Ошибка получения данных о подписках пользователя:",
          error
        );
      }
    }

    fetchUserSubscriptions();
  }, []);

  useEffect(() => {
    async function fetchUserDetails() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }
      try {
        const response = await fetch(
          "http://Flixx/src/api/getUserDetails.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );
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

    fetchUserDetails();
  }, []);

  return (
    <>
      {user && <ChannelPreview user={user} video={video} />}
      <CategorySliderAccount />

      <div className="flex flex-col gap-10 mx-8">
        <div className="textGradient mt-[40px] text-2xl">Подписки</div>
        <div className="max-w-[80vw] overflow-hidden sm-mobile:max-w-[88vw] mobile:max-w-[93vw]">
          <div className="bg-searchText mb-5 flex overflow-auto scrollbar-hide relative rounded-2xl p-5 tablet-s:grid tablet-s:grid-cols-4 tablet:grid-cols-5 laptop:grid-cols-6 desktop:grid-cols-7 bd:grid-cols-9 place-items-center gap-4">
            {videos.map((subscription: any) => (
              <SubCard
                key={subscription.channel_id}
                subscription={subscription}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
