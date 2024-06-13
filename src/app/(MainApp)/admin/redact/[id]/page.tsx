"use client";

import React, { useState, useEffect } from "react";
import { RedactIcon, UploadCreamIcon } from "@/ui/icons/index";
import { useRouter } from "next/navigation";
import HeaderCursed from "@/components/header/headerCursed";
import Footer from "@/components/footer/footer";

interface StickerData {
  id: string;
  name: string;
  photo: File | string;
}

interface Props {
  params: {
    id: number;
  };
}

function EditStickerPage({ params }: Props) {
  const [stickerData, setStickerData] = useState<StickerData>({
    id: "",
    name: "",
    photo: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [previewFileName, setPreviewFileName] = useState("");
  const { push } = useRouter();

  useEffect(() => {
    const fetchStickerData = async () => {
      try {
        const response = await fetch(`http://Cursed/src/api/getVideo.php?id=${params.id}`);
        const data = await response.json();
        if (response.ok) {
          setStickerData({
            ...data,
            photo: data.photo,
          });
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchStickerData();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStickerData({
      ...stickerData,
      [name]: value,
    });
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFileName(file.name);
      setStickerData({
        ...stickerData,
        photo: file,
      });
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", stickerData.id);
      formDataToSend.append("name", stickerData.name);
      if (stickerData.photo instanceof File) {
        formDataToSend.append("photo", stickerData.photo);
      }

      const response = await fetch("http://Cursed/src/api/editVideo.php", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          push("/admin");
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
      <HeaderCursed />
      <div className="m-3">
        <RedactIcon className="scale-[.3] -translate-x-96 mobile:scale-[.3] tablet-s:scale-[.5] tablet-s:-translate-x-12 tablet:-translate-x-0 tablet:scale-[1]" />
        <div className="flex flex-col justify-center items-center">
          {showSuccessMessage && (
            <div className="bg-green-200 text-green-800 rounded-md p-3 mb-3">
              Стикер успешно отредактирован!
            </div>
          )}
          <div className="flex flex-col justify-center items-center w-full">
            <form
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
              className="flex justify-center gap-y-7 flex-col max-w-[576px] w-full"
            >
              <div className="flex flex-col w-full justify-center gap-x-7 gap-y-7">
                <div className="">
                  <label htmlFor="name" className="text-base text-yellow-cream">
                    Название
                  </label>
                  <div className="max-w-[576px] mt-[10px] max-h-[45px] h-full w-full rounded-lg bg-inherit">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={stickerData.name}
                      onChange={handleChange}
                      className="bg-inherit z-10 border-[#666666] placeholder:text-yellow-cream text-yellow-cream border-[1px] w-full pl-[14px] pr-[15px] pt-[13px] pb-[8px] rounded-lg outline-none "
                    />
                  </div>
                </div>
                <div className="flex gap-x-4 w-full">
                  <div className="mb-4 w-full">
                    <label htmlFor="photo" className="text-base text-yellow-cream">
                      Изображение
                    </label>
                    <div className="max-w-[576px] mt-[10px] cursor-pointer flex-col flex justify-center items-center max-h-[84px] relative h-full w-full rounded-lg duration-300 hover:bg-[#464646] border-[1px] border-[#666666]">
                      {!previewFileName && (
                        <div className="absolute pointer">
                          <UploadCreamIcon />
                        </div>
                      )}
                      {typeof stickerData.photo === "object" && (
                        <div className="absolute pointer">
                          <span className="text-sideText text-center line-clamp-1 overflow-hidden w-[230px]">
                            {stickerData.photo.name}
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handlePreviewChange}
                        accept="image/*"
                        className="bg-inherit py-[16px] cursor-pointer opacity-0 flex rounded-lg outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-full max-w-[576px] text-xl leading-5 rounded-[12px] p-5 bg-[#1F1F1F] text-white duration-300 hover:bg-searchText"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditStickerPage;
