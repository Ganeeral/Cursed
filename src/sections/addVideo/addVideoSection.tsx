"use client";

import React, { useState } from "react";
import { UploadIcon } from "@/ui/icons/index";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  description: string;
  preview: File | string;
  video: File | string;
}

function AddVideoPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    preview: "",
    video: "",
  });

  const [previewFileName, setPreviewFileName] = useState("");
  const [videoFileName, setVideoFileName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { push } = useRouter();

  const userId = localStorage.getItem("user_id");

  if (!userId) {
      alert('Пользователь не авторизован');
      return;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (
      e.target instanceof HTMLInputElement &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      if (name === "preview") {
        setPreviewFileName(e.target.files[0].name);
        setFormData({
          ...formData,
          preview: e.target.files[0],
        });
      } else if (name === "video") {
        setVideoFileName(e.target.files[0].name);
        setFormData({
          ...formData,
          video: e.target.files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("preview", formData.preview);
      formDataToSend.append("video", formData.video);
      formDataToSend.append('user_id', userId);
      const response = await fetch("http://Flixx/src/api/addPendingVideo.php", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          push("/channel");
        }, 3000);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <div className="m-3">
      <h1 className="textGradient mt-[50px] tablet:ml-[60px] text-2xl font-bold mb-4">
        Добавить видео
      </h1>
      <div className="flex flex-col justify-center items-center">
        {showSuccessMessage && (
          <div className="bg-green-200 text-green-800 rounded-md p-3 mb-3">
            Видео успешно загружено!
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
                <div className="max-w-[270px] mt-[10px] max-h-[45px] h-full w-full rounded-lg bg-btnActive">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Введите название видео"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-inherit w-full pl-[14px] pr-[15px] pt-[13px] pb-[8px] rounded-lg outline-none text-[#8A8A8A]"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="mb-4">
                  <label htmlFor="preview" className="text-base text-gray-text">
                    Загрузка превью
                  </label>
                  <div className="max-w-[270px] mt-[10px] cursor-pointer flex-col flex justify-center items-center max-h-[84px] relative h-full w-full rounded-lg duration-300  hover:bg-[#464646] bg-btnActive">
                    {!previewFileName && (
                      <div className="absolute pointer">
                        <UploadIcon />
                      </div>
                    )}
                    {typeof formData.preview === "object" && (
                      <div className="absolute pointer">
                        <span className="text-sideText text-center line-clamp-1 overflow-hidden w-[230px]">
                          {formData.preview.name}
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="preview"
                      name="preview"
                      onChange={handleChange}
                      accept="image/*"
                      className="bg-inherit py-[16px] cursor-pointer opacity-0 flex rounded-lg outline-none w-full"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="preview" className="text-base text-gray-text">
                    Загрузка видео
                  </label>
                  <div className="max-w-[270px] mt-[10px] cursor-pointer flex-col flex justify-center items-center max-h-[84px] relative h-full w-full rounded-lg duration-300  hover:bg-[#464646] bg-btnActive">
                    {!videoFileName && (
                      <div className="absolute pointer">
                        <UploadIcon />
                      </div>
                    )}
                    {typeof formData.video === "object" && (
                      <div className="absolute pointer">
                        <span className="text-sideText text-center line-clamp-1 overflow-hidden w-[230px]">
                          {formData.video.name}
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      id="video"
                      name="video"
                      onChange={handleChange}
                      accept="video/*"
                      className="bg-inherit py-[16px] cursor-pointer opacity-0 flex rounded-lg outline-none w-full"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="">
              <label htmlFor="description" className="text-base text-gray-text">
                Описание
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="rounded-lg px-[17px] placeholder:text-sideText text-gray-text py-[13px] outline-none bg-btnActive h-[126px] flix:h-[176px] w-full"
                placeholder="Введите описание видео"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="addBtn text-white px-6 outline-none py-3 rounded-xl"
              >
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddVideoPage;
