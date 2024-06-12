"use client";

import React, { useState, useEffect } from "react";
import { UploadIcon } from "@/ui/icons/index";
import ChannelPreviewSection from "@/sections/channelPreview/channelPreviewSection";
import { User } from "@/types/user";
import { Video } from "@/types/video";
import { useRouter } from "next/navigation";
import ChannelPreview from "@/sections/channelPreview/channelPreview";

interface VideoData {
  id: string;
  title: string;
  description: string;
  preview: File | string;
}

interface Props {
  videoId: string;
}

function EditVideoPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const [videoData, setVideoData] = useState<VideoData>({
    id: "",
    title: "",
    description: "",
    preview: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [previewFileName, setPreviewFileName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [video, setVideo] = useState<Video | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { push } = useRouter();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

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

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `http://flixx/src/api/getVideo.php?id=${params.id}`
        );
        const data = await response.json();
        if (response.ok) {
          setVideoData(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchVideoData();
  }, [params.id]);

  useEffect(() => {
    async function checkAuthorization() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }
      try {
        const response = await fetch(
          `http://flixx/src/api/checkVideoOwnership.php?id=${params.id}&user_id=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );
        const data = await response.json();
        if (!data.authorized) {
          console.error("Вы не авторизованы для редактирования этого видео");
          push("/");
        }
      } catch (error) {
        console.error("Ошибка проверки авторизации:", error);
      }
    }

    checkAuthorization();
  }, [params.id, push]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVideoData({
      ...videoData,
      [name]: value,
    });
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target;
    if (
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      if (file) {
        setPreviewFileName(e.target.files[0].name);
        setVideoData({
          ...videoData,
          preview: e.target.files[0],
        });
      }
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", videoData.id);
      formDataToSend.append("title", videoData.title);
      formDataToSend.append("description", videoData.description);
      formDataToSend.append("preview", videoData.preview);

      const response = await fetch("http://flixx/src/api/editVideo.php", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <>
      {user && <ChannelPreview user={user} video={null} />}
      <div className="m-3">
        <h1 className="textGradient mt-[50px] tablet:ml-[60px] text-2xl font-bold mb-4">
          Редактировать видео
        </h1>
        <div className="flex flex-col justify-center items-center">
          {showSuccessMessage && (
            <div className="bg-green-200 text-green-800 rounded-md p-3 mb-3">
              Видео успешно отредактировано!
            </div>
          )}
          <div className="flex flex-col justify-center items-center">
            <form
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
              className="flex justify-center gap-y-7 flix:gap-y-0 flex-col max-w-[860px] w-full"
            >
              <div className="flex flex-col flix:flex-row justify-center gap-x-7 gap-y-7 flix:gap-y-0">
                <div className="">
                  <label htmlFor="title" className="text-base text-gray-text">
                    Название
                  </label>
                  <div className="max-w-[270px] mt-[10px] max-h-[45px] h-full w-full rounded-lg bg-searchText">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Введите название видео"
                      value={videoData.title}
                      onChange={handleChange}
                      className="bg-inherit w-full pl-[14px] pr-[15px] pt-[13px] pb-[8px] rounded-lg outline-none text-sideText"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <div className="mb-4">
                    <label
                      htmlFor="preview"
                      className="text-base text-gray-text"
                    >
                      Загрузка превью
                    </label>
                    <div className="max-w-[270px] mt-[10px] cursor-pointer flex-col flex justify-center items-center max-h-[84px] relative h-full w-full rounded-lg duration-300  hover:bg-[#464646] bg-searchText">
                      {!previewFileName && (
                        <div className="absolute pointer">
                          <UploadIcon />
                        </div>
                      )}
                      {typeof videoData.preview === "object" && (
                        <div className="absolute pointer">
                          <span className="text-sideText text-center line-clamp-1 overflow-hidden w-[230px]">
                            {videoData.preview.name}
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="preview"
                        name="preview"
                        onChange={handlePreviewChange}
                        accept="image/*"
                        className="bg-inherit py-[16px] cursor-pointer opacity-0 flex rounded-lg outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="description"
                  className="text-base text-gray-text"
                >
                  Описание
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={videoData.description}
                  onChange={handleChange}
                  className="rounded-lg placeholder:text-sideText px-[17px] text-sideText py-[13px] outline-none bg-searchText h-[126px] flix:h-[176px] w-full"
                  placeholder="Введите описание видео"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="addBtn text-white px-6 outline-none py-3 rounded-xl"
                >
                  Редактировать
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVideoPage;
