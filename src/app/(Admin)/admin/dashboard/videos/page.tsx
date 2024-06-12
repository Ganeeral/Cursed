"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { SearchAdminIcon } from "@/ui/icons";
import { Video } from "@/types/video";
import DropdownVideo from "@/components/dropDownList/DropDownVideo";

interface Category {
  id: number;
  name: string;
}

const AdminPendingVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://Flixx/src/api/getPendingVideos.php")
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => console.error("Ошибка при загрузке видео:", error));

    axios
      .get("http://Flixx/src/api/getCategories.php")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Ошибка при загрузке категорий:", error));
  }, []);

  const approveVideo = async (id: number) => {
    if (!selectedCategory) {
      alert("Пожалуйста, выберите категорию для видео.");
      return;
    }

    try {
      await axios.post("http://Flixx/src/api/approveVideo.php", {
        video_id: id,
        category_id: selectedCategory,
      });
      const updatedVideos = videos.filter((video) => video.id !== id);
      setVideos(updatedVideos);
    } catch (error) {
      console.error("Ошибка при подтверждении видео:", error);
    }
  };

  const deleteVideo = (id: number) => {
    axios
      .post("http://Flixx/src/api/deleteVideo.php", { video_id: id })
      .then((response) => {
        const updatedVideos = videos.filter((video) => video.id !== id);
        setVideos(updatedVideos);
      })
      .catch((error) => console.error("Ошибка при удалении видео:", error));
  };

  return (
    <div className="mt-8 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-6 flix:flex-row flix:justify-between flix:w-full flix:items-center">
        <div className="flex items-center rounded-xl bg-textGray">
          <Link
            href="/admin/dashboard/videos"
            className="text-lg hover:bg-[#e4e4e4] rounded-l-lg p-3 transition-all duration-300"
          >
            проверка
          </Link>
          <Link
            href="/admin/dashboard/videos/report"
            className="text-lg hover:bg-[#e4e4e4] rounded-r-lg p-3 transition-all duration-300"
          >
            жалобы
          </Link>
        </div>
        <div className="flex items-center p-3 gap-x-1 bg-lightGray rounded-lg w-full flix:max-w-[260px]">
          <div className="">
            <SearchAdminIcon />
          </div>
          <input
            type="text"
            placeholder="Введите название видео"
            className="placeholder:text-searchText placeholder:text-base bg-inherit outline-none text-searchText text-xs mobile:text-base w-full"
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-y-5">
        {videos.length === 0 ? (
          <div className="text-center text-lg">Видео на проверку нету</div>
        ) : (
          videos.map((video: Video) => (
            <div
              key={video.id}
              className="flex w-full items-center justify-between p-2 bg-lightGray rounded-xl"
            >
              <div className="flex gap-x-6 items-center">
                <Image
                  src={video.preview}
                  alt=""
                  layout="responsive"
                  width={100}
                  height={100}
                  className="min-w-[64px] max-w-[64px] min-h-[64px] rounded-xl object-cover object-center"
                />
                <div className="flex flex-col gap-y-2">
                  <div className="text-sm line-clamp-1 overflow-hidden">
                    {video.title}
                  </div>
                  <div className="text-xs line-clamp-1 overflow-hidden">
                    {video.description}
                  </div>
                </div>
              </div>
              <div>
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(Number(e.target.value))}
                  className="p-2 rounded-md border"
                >
                  <option value="" disabled>
                    Выберите категорию
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <DropdownVideo
                approve={() => approveVideo(video.id)}
                onDelete={() => deleteVideo(video.id)}
                watch={() =>
                  router.push(`/admin/dashboard/videos/watch/${video.id}`)
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPendingVideos;
