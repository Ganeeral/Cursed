"use client";

import Footer from "@/components/footer/footer";
import HeaderCursed from "@/components/header/headerCursed";
import {
  BorderAvatarIcon,
  ClickIcon,
  DecorIcon,
  UserAvatarIcon,
} from "@/ui/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
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
        {/* <DecorIcon className="absolute right-0 max-w-[700px]" /> */}
      </div>
      <Footer />
    </>
  );
};

export default page;
