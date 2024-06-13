"use client";

import Footer from "@/components/footer/footer";
import HeaderCursed from "@/components/header/headerCursed";
import {
  BasketIcon,
  BorderAvatarIcon,
  ClickIcon,
  DecorIcon,
  UserAvatarIcon,
} from "@/ui/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface User {
  login: string;
  photo: string;
}

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [newPhoto, setNewPhoto] = useState<string>("");


  useEffect(() => {
    async function fetchUserDetails() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }
      try {
        const response = await axios.post(
          "http://Cursed/src/api/getUserDetails.php",
          { user_id: userId }
        );
        if (response.data && !response.data.message) {
          setUser(response.data);
          setNewName(response.data.name);
          setNewPhoto(response.data.photo);
        } else {
          console.error("Пользователь не найден");
        }
      } catch (error) {
        console.error("Ошибка получения данных о пользователе:", error);
      }
    }

    fetchUserDetails();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("Пользователь не авторизован");
      return;
    }
    try {
      const response = await axios.post(
        "http://Cursed/src/api/updateUserDetails.php",
        { user_id: userId, login: newName, photo: newPhoto }
      );
      if (response.data && !response.data.error) {
        setUser({ login: newName, photo: newPhoto });
      } else {
        console.error("Ошибка обновления данных пользователя");
      }
    } catch (error) {
      console.error("Ошибка обновления данных пользователя:", error);
    }
  };

  return (
    <>
      <HeaderCursed />
      <div className="flex relative justify-center items-center pt-48">
        <div className="relative">
          <div className="flex relative cursor-pointer z-10 justify-center items-end">
            <BorderAvatarIcon className="z-10" />
            {user && (
              <Image
                src={newPhoto || user.photo}
                alt="User Avatar"
                className="absolute w-full h-full object-cover max-w-[200px] max-h-[200px]"
                width={100}
                height={100}
              />
            )}
            <input
              type="file"
              accept="image/*"
              id="fileUpload"
              className="absolute inset-0 z-20 opacity-0 w-full h-full cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
          <ClickIcon className="absolute hidden mobile:block top-[-7rem] right-[-7rem]" />
          <input
            type="text"
            value={user?.login || newName}
            onChange={(e) => setNewName(e.target.value)}
            className="font-semibold text-yellow-cream text-3xl text-center bg-transparent border-none outline-none"
          />
          <button
            onClick={handleSave}
            className="z-20 w-full relative flex flex-col justify-center items-center gap-y-6 mx-auto mt-10 btn-background cursor-pointer"
          >
            <div className="flex justify-center items-center h-full">
              <p className="font-bold text-xl uppercase text-yellow-cream">
                Сохранить
              </p>
            </div>
          </button>
          <div className="z-20 w-full relative flex flex-col justify-center items-center gap-y-6 mx-auto mt-10">
            <Link href="/" className="btn-background cursor-pointer">
              <div className="flex justify-center items-center h-full">
                <p className="font-bold text-xl uppercase text-yellow-cream">
                  Выйти
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-main">
        <div className="flex justify-between px-20 items-center w-full mt-28">
          <div className="flex gap-x-4">
            <Link href="/admin" className="text-yellow-cream font-semibold text-3xl">Стикеры</Link>
            <Link href="/admin/users" className="text-yellow-cream font-semibold text-3xl  underline underline-offset-4">пользователи</Link>
          </div>
        </div>
        <div className="w-full mt-16 p-11 bg-[#020506] rounded-3xl">
          <div className="w-full bg-[#030708] rounded-xl p-9 flex justify-between items-center">
            <div className="flex gap-6 items-center">
              <span className="font-semibold text-yellow-cream text-3xl">
                1
              </span>
              <p className="font-semibold line-clamp-1 overflow-hidden text-yellow-cream text-2xl">
                Огненный взор
              </p>
            </div>

            <div className="flex gap-x-3 items-center">
              <Link href="" className="font-semibold text-yellow-cream text-xl">
                Заблокировать
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
