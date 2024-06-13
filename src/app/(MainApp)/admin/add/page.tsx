"use client";

import React, { useState } from "react";
import { AddIcon, UploadCreamIcon } from "@/ui/icons/index";
import { useRouter } from "next/navigation";
import HeaderCursed from "@/components/header/headerCursed";
import Footer from "@/components/footer/footer";

interface FormData {
  title: string;
  preview: File | string;
}

function AddVideoPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    preview: "",
  });

  const [previewFileName, setPreviewFileName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { push } = useRouter();


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
      formDataToSend.append("preview", formData.preview);
      const response = await fetch("http://Cursed/src/api/addPendingVideo.php", {
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
        <AddIcon className="scale-[.3] -translate-x-64 mobile:scale-[.5]  tablet-s:scale-[.7] tablet-s:-translate-x-12 tablet:-translate-x-0 tablet:scale-[1]"/>
        <div className="flex flex-col justify-center items-center">
          {showSuccessMessage && (
            <div className="bg-green-200 text-green-800 rounded-md p-3 mb-3">
              Стикер успешно загружен!
            </div>
          )}
          <div className="flex flex-col justify-center items-center w-full">
            <form
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
              className="flex justify-center gap-y-7 flix:gap-y-0 flex-col max-w-[576px] w-full"
            >
              <div className="flex flex-col w-full justify-center gap-x-7 gap-y-7">
                <div className="">
                  <label
                    htmlFor="title"
                    className="text-base text-yellow-cream"
                  >
                    Название
                  </label>
                  <div className="max-w-[576px] mt-[10px] max-h-[45px] h-full w-full rounded-lg bg-inherit">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Введите название стикера"
                      value={formData.title}
                      onChange={handleChange}
                      className="bg-inherit border-[#666666] placeholder:text-yellow-cream text-yellow-cream border-[1px] w-full pl-[14px] pr-[15px] pt-[13px] pb-[8px] rounded-lg outline-none "
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-x-4 w-full">
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="preview"
                      className="text-base text-yellow-cream"
                    >
                      Изображение
                    </label>
                    <div className="max-w-[576px] mt-[10px] cursor-pointer flex-col flex justify-center items-center max-h-[84px] relative h-full w-full rounded-lg duration-300  hover:bg-[#464646] border-[1px]  border-[#666666]">
                      {!previewFileName && (
                        <div className="absolute pointer">
                          <UploadCreamIcon />
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
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="w-full max-w-[576px] text-xl leading-5 rounded-[12px] p-5 bg-[#1F1F1F] text-white duration-300 hover:bg-searchText"
                >
                  Добавить
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

export default AddVideoPage;
