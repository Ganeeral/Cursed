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

const Page = () => {
  return (
    <>
      <HeaderCursed />
      <div className="flex relative justify-center items-center pt-48">
        <div className="relative">
          <div className="flex relative cursor-pointer z-10 justify-center items-end">
            <BorderAvatarIcon className="z-10" />
            <UserAvatarIcon className="absolute" />
            <input
              type="file"
              accept="image/*"
              id="fileUpload"
              className="absolute inset-0 z-20 opacity-0 w-full h-full cursor-pointer"
            />
          </div>
          <ClickIcon className="absolute hidden mobile:block top-[-7rem] right-[-7rem]" />
          <p className="font-semibold text-yellow-cream text-3xl text-center">
            user
          </p>
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
          <p className="text-yellow-cream font-semibold text-4xl">Стикеры</p>
          <Link href="" className="text-6xl text-[#AB2A32]">
            +
          </Link>
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
                Редактирать
              </Link>
              <Link href="">
                <BasketIcon />
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
