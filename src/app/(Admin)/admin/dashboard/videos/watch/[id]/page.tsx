"use client";

import React, { useEffect, useState } from "react";
import WatchCard from "@/components/watchCard/page";
import axios from "axios";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import cn from "classnames";
import Image from "next/image";
import SubscribeBtn from "@/ui/buttons/SubscribeBtn";
import FormatSubs from "@/components/format/formatSubs";
import LikeBtn from "@/ui/buttons/LikeBtn";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import ShareBtn from "@/ui/buttons/ShareBtn";
import FormatWatch from "@/components/format/formatWatch";
import { formatRelativeDate } from "@/components/format/formatDateMain";
import VideoDescription from "@/components/videoDescription/videoDescription";
import AboutWatch from "@/components/aboutWatch/AboutWatch";
import SideVideo from "@/components/sideVideo/SideVideo";
import CommentsBlock from "@/components/commentsBlock/commentsBlock";
import { Video } from "@/types/video";
import { useRouter } from "next/navigation";

const Watch = ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://flixx/src/api/getPendingVideo.php?id=${params.id}`
        );
        setVideo(response.data);

        const userResponse = await axios.post(
          "http://flixx/src/api/getUserDetails.php",
          {
            user_id: response.data.author_id,
          }
        );
        setUser(userResponse.data);
      } catch (error) {
        console.error("Ошибка при извлечении видео или пользователя:", error);
      }
    };

    fetchVideo();

    const fetchCurrentUser = async () => {
      const userId = localStorage.getItem("user_id");
      if (userId) {
        setCurrentUserId(parseInt(userId, 10));
      }
    };

    fetchCurrentUser();
  }, [params.id]);

  useEffect(() => {
    const recordView = async () => {
      if (currentUserId && video) {
        try {
          await axios.post("http://flixx/src/api/updateView.php", {
            video_id: video.id,
            user_id: currentUserId,
          });
        } catch (error) {
          console.error("Ошибка при обновлении просмотров:", error);
        }
      }
    };

    recordView();
  }, [currentUserId, video]);

  if (!video || !user) {
    return <div>Loading...</div>;
  }

  const isOwner = currentUserId === video.author_id;

  return (
    <div
      className={cn(
        "flex my-10 flex-col mx-2 justify-center",
        "tablet-s:mx-5",
        "tablet:gap-x-5",
        "desktop:flex-row"
      )}
    >
      <div className={cn("mt-4 flex flex-col gap-y-4", "flix:mt-2")}>
        <MediaPlayer title={video.title} src={video.video_url}>
          <MediaProvider />
          <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
      </div>
    </div>
  );
};

export default Watch;
