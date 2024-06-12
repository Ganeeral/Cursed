import {
  CursedLogo,
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/ui/icons";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="container-main w-full">
      <div className="mt-64 w-full px-8 flex flex-col gap-y-20 justify-center items-center">
        <div className="w-full h-[1px] bg-white opacity-35"></div>
        <CursedLogo className="scale-50 mobile:scale-75 tablet:scale-100" />
        <div className="w-full flex gap-y-6 flex-col">
          <div className="flex justify-center items-center mobile:justify-between flex-col mobile:flex-row gap-y-2 w-full">
            <div className="flex gap-x-9">
              <Link href="" className="font-black text-lg text-white">
                Профиль
              </Link>
              <Link href="" className="font-black text-lg text-white">
                Новости
              </Link>
            </div>

            <div className="flex gap-x-5 items-center">
              <TwitterIcon className="svghover transition-all duration-300 hover:-translate-y-2 hover:fill-yellow-cream cursor-pointer" />
              <InstagramIcon className="svghover transition-all duration-300 hover:-translate-y-2 hover:fill-yellow-cream cursor-pointer" />
              <DiscordIcon className="svghover transition-all duration-300 hover:-translate-y-2 hover:fill-yellow-cream cursor-pointer" />
              <FacebookIcon className="svghover transition-all duration-300 hover:-translate-y-2 hover:fill-yellow-cream cursor-pointer" />
            </div>
          </div>
          <div className="w-full h-[1px] bg-white opacity-35"></div>
          <div className="flex w-full flex-col mobile:flex-row gap-y-2 justify-between items-center mb-16 ">
            <p className="uppercase text-sm font-bold text-white opacity-35">
              By pestov roman
            </p>
            <p className="uppercase text-sm font-bold text-white opacity-35">
              Copyright 2024, PEstov roman
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
