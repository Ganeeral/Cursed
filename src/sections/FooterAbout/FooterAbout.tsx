import Link from "next/link";
import React, { useEffect } from "react";
import {
  LogoWhiteIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/ui/icons";

const data = [
  {
    Id: 1,
    Icon: InstagramIcon,
    href: "/",
  },
  {
    Id: 2,
    Icon: FacebookIcon,
    href: "/",
  },
  {
    Id: 3,
    Icon: LinkedinIcon,
    href: "/",
  },
  {
    Id: 4,
    Icon: YoutubeIcon,
    href: "/",
  },
];

const FooterAbout = () => {
  return (
    <div className="flex justify-center items-center bg-background flix:mt-20">
      <div className="max-w-[1200px] w-full mx-6 pt-24 pb-9 tablet-lg:py-24">
        <div className="flex flex-col gap-y-5">
          <div className="mx-auto">
            <h1 className="text-sm uppercase text-[#A3A3A3] sftext">
              Видеохостинг FLIX
            </h1>
          </div>

          <div className="flex items-center justify-center flex-col gap-y-12">
            <div className="flex items-center flex-col gap-y-2">
              <h4 className="text-lightGray text-2xl flix:text-5xl text-center">
                Система видеохостинга
              </h4>

              <p className="sftext text-base flix:text-xl text-center text-[#A3A3A3]">
                FLIX media - это инновационная компания, которая предоставляет
                платформу, <br className="hidden flix:block" /> где каждый может
                выразить себя.
              </p>
            </div>

            <button className="mx-auto w-full flix:w-min mobile-lg:mx-0 gradientBtn py-4 px-10 rounded-[50px] text-white z-10">
              Попробовать
            </button>

            <div className="text-sm text-[#A3A3A3]">© 2024 Пестов Роман</div>
          </div>

          <div className="flex justify-center items-center flex-col gap-y-6">
            <div className="w-full border border-[#A3A3A3] divide-solid opacity-20"></div>
            <div className="flex items-center justify-between w-full flex-wrap tablet-lg:flex-nowrap gap-y-8">
              <Link
                className="mobile:max-w-[276px] mobile:w-full"
                href="/about"
              >
                <LogoWhiteIcon />
              </Link>

              <div className="flex justify-center items-center gap-x-5 mobile:max-w-[276px] mobile:w-full">
                <Link className="text-lightGray" href="/about">
                  О сервисе
                </Link>
                <Link className="text-lightGray" href="/privacy-policy">
                  Политика
                </Link>
              </div>

              <div className="flex gap-x-6">
                {data.map((item) => (
                  <Link
                    key={item.Id}
                    href={item.href}
                    className="flex justify-center items-center p-4 rounded-full border-[2px] divide-solid border-[#A3A3A3] hover:bg-[#A3A3A3] transition-all duration-200 cursor-pointer"
                  >
                    <item.Icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterAbout;
