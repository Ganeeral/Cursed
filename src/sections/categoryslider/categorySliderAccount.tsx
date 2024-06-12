"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CommunityIcon,
  HomeIcon,
  SubsIcon,
  VideosIcon,
} from "@/ui/icons/index";
import { usePathname } from "next/navigation";

const categories = [
  {
    title: "Главная",
    to: "/channel",
    icon: <HomeIcon />,
  },
  {
    title: "Видео",
    to: "/",
    icon: <VideosIcon />,
  },
  {
    title: "Подписки",
    to: "/subscriptions",
    icon: <SubsIcon />,
  },
  {
    title: "Сообщество",
    to: "/",
    icon: <CommunityIcon />,
  },
];

const SliderAccount: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleCategoryClick = (index: number) => {
    setSelectedCategory(index);
  };

  const pathname = usePathname();

  return (
    <div className="category flex flix:ml-5 mt-[25px]">
      <div className="max-w-[100vw] overflow-hidden">
        <div className="flex items-center justify-between px-4">
          <div className="flex rounded-[46px] bg-searchText overflow-auto scrollbar-hide relative">
            {categories.map((category, index) => (
              <div key={index} className="flex-shrink-0">
                <Link href={category.to}>
                  <div
                    className={`cursor-pointer px-6 py-[17px] ${
                      pathname === category.to
                        ? "bg-btnActive text-sideText duration-300 rounded-[74px]"
                        : "bg-searchText text-sideText hover:rounded-[74px] duration-300"
                    }`}
                    onClick={() => handleCategoryClick(index)}
                  >
                    <div className="flex items-center gap-x-5">
                      {category.icon}
                      <span>{category.title}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderAccount;
