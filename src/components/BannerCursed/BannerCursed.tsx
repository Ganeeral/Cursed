import { ScrollBtnIcon } from "@/ui/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BannerCursed = () => {
  return (
    <section className="h-screen">
      <div className="banner background-tint flex laptop:justify-start justify-center items-center h-full">
        <div className="z-20 max-w-[613px] w-full relative flex flex-col justify-center items-center gap-y-6 mx-auto my-0 laptop:mx-0 laptop:left-48">
          <div className="mx-10">
            <Image
              src="LogoCursedFull.svg"
              alt=""
              width={100}
              height={100}
              className="w-full"
            />
            <p className="font-bold text-center text-base text-white">
              Скоро на всех платформах!
            </p>
          </div>
          <Link href="/" className="btn-background cursor-pointer z-[99]">
            <div className="flex justify-center items-center h-full z-[99]">
              <p className="font-bold text-xl uppercase text-yellow-cream">
                Играть!
              </p>
            </div>
          </Link>
        </div>
      </div>
      <a href="#banner">
        <ScrollBtnIcon className="absolute cursor-pointer bottom-0 left-0 right-0 mx-auto mb-4" />
      </a>
    </section>
  );
};

export default BannerCursed;
