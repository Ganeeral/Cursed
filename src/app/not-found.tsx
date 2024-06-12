"use client";

import React from "react";
import { NotFound } from "@/ui/icons";
import Link from "next/link";
import "@/app/globals.css";

const NotFounds: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-14 w-full h-[100vh] mx-4">
      <div className="notFound relative">
        <NotFound />
      </div>
      <div className="bg-searchText h-[1px] max-w-[1170px] w-full"></div>
      <div className="flex flex-col items-center gap-y-6">
        <h3 className="text-display-2 mobile:text-display-4 text-white text-center">
          Ой! Страницы не существует
        </h3>
        <p className="text-sideText text-center max-w-[576px] w-full">
          К сожалению, запрашиваемая страница не найдена. Возможно, вы ввели
          неправильный адрес или страницы больше не существует. Пожалуйста,
          вернитесь на главную страницу сайта и попробуйте найти нужную
          информацию через меню навигации.
        </p>
      </div>
      <Link className="w-full mobile:w-[159px]" href="/">
        <button className="gradientBtn py-3 px-8 rounded-md text-white w-full">На главную</button>
      </Link>
    </div>
  );
};

export default NotFounds;
