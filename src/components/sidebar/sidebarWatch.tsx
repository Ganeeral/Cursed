"use client";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Separator from "../separator/separator";
import React from "react";
import { usePathname } from "next/navigation";

import {
  BurgerIcon,
  BellIcon,
  CreateVideoIcon,
  HictoryIcon,
  HouseIcon,
  LaterIcon,
  LikeIcon,
  MicrophoneIcon,
  MusicIcon,
  SearchIcon,
  ShortsIcon,
  SubIcon,
  VideoIcon,
  LogoIcon,
  ChevronRight,
  RingG,
  BurgerIconMobile,
  RingGMobile,
} from "../../ui/icons/index";

const data = [
  {
    items: [
      {
        title: "Главная",
        icon: HouseIcon,
        to: "/",
      },
      {
        title: "Shorts",
        icon: ShortsIcon,
        to: "/shorts",
      },
      {
        title: "Подписки",
        icon: SubIcon,
        to: "/subscriptions",
      },
      {
        title: "Музыка",
        icon: MusicIcon,
        to: "/music",
      },
    ],
  },
];
const chanel = [
  {
    name: "Мой канал",
    items: [
      {
        title: "История",
        icon: HictoryIcon,
        to: "/history",
      },
      {
        title: "Ваши видео",
        icon: VideoIcon,
        to: "/channel",
      },
      {
        title: "Понравившиеся",
        icon: LikeIcon,
        to: "/liked",
      },
      {
        title: "Смотреть позже",
        icon: LaterIcon,
        to: "/watch-later",
      },
    ],
  },
];

const href = [
  {
    Id: 1,
    title: "О сервисе",
    href: "/about",
  },
  {
    Id: 2,
    title: "Авторские права",
    href: "/privacy-policy",
  },
  {
    Id: 3,
    title: "Конфиденциальность",
    href: "/privacy-policy",
  },
];

export default function Home() {
  const [active, setActive] = useState(false);
  const [isColumn, setIsColumn] = useState(false);
  const controls = useAnimation();
  const controlText = useAnimation();
  const controlTextUp = useAnimation();
  const controlTitleText = useAnimation();
  const pathname = usePathname();
  const controlFooter = useAnimation();

  const showMore = () => {
    setIsColumn(false);
    controls.start({
      width: "248px",
      transition: { duration: 0.001 },
    });
    controlText.start({
      opacity: 1,
      display: "block",
      transition: { delay: 0.3 },
    });
    controlTitleText.start({
      opacity: 1,
      transition: { delay: 0.3 },
    });
    controlFooter.start({
      opacity: 1,
      display: "Flex",
      transition: { duration: 0.2 },
    });

    setActive(true);
  };

  const showLess = useCallback(() => {
    setIsColumn(true);
    controls.start({
      width: "0px",
      transition: { duration: 0.001 },
    });

    controlText.start({
      opacity: 0,
      display: "none",
    });

    controlTitleText.start({
      opacity: 0,
    });
    controlFooter.start({
      opacity: 0,
      display: "Flex",
      transition: { duration: 0.2 },
    });

    setActive(false);
  }, [
    setIsColumn,
    controls,
    controlText,
    controlTitleText,
    setActive,
    controlFooter,
  ]);

  useEffect(() => {
    showLess();
  }, [showLess]);

  return (
    <div
      className={`max-w-[248px] z-30 fixed w-full`}
      style={{ maxWidth: isColumn ? "0px" : "248px" }}
    >
      <div className="max-w-[248px]">
        <motion.div
          animate={controls}
          className="sideBar max-w-[248px] animate duration-300 relative flex flex-col h-screen justify-between  group "
        >
          <div>
            <div className="flex items-center pt-[20px] pb-[20px] pl-[8px] tablet-s:pl-[20px] gap-x-[16px]">
              <div>
                {active && (
                  <BurgerIcon className="cursor-pointer" onClick={showLess} />
                )}
                {!active && (
                  <BurgerIcon className="cursor-pointer" onClick={showMore} />
                )}
              </div>

              <Link href="/" onClick={showLess} passHref>
                <span>
                  <svg
                    width="48"
                    height="26"
                    viewBox="0 0 48 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.728 26V0.799998H13.868V5.12H5.66V11.42H12.788V15.596H5.66V26H0.728ZM21.2427 0.799998V26H16.4907V0.799998H21.2427ZM25.0505 26V7.604H29.8025V26H25.0505ZM25.0505 0.799998H29.8025V5.66H25.0505V0.799998ZM39.6943 14.444L41.9263 7.604H46.9303L43.5103 16.568L47.0743 26H42.1423L39.6583 18.872H39.5143L37.1383 26H32.2063L35.7703 16.568L32.3503 7.604H37.2823L39.5503 14.444H39.6943Z"
                      fill="url(#paint0_linear_10_335)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_10_335"
                        x1="59.8788"
                        y1="7.19355"
                        x2="22.9334"
                        y2="35.254"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#472078" />
                        <stop offset="1" stopColor="#F6416C" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </Link>
            </div>
            <div
              className="mt-5"
              style={{
                marginTop: isColumn ? "18px" : "0px",
                columnGap: isColumn ? 0 : "16px",
              }}
            >
              <Separator />
            </div>
            <div>
              <motion.div animate={controlText}>
                {data.map((group, index) => (
                  <div key={index}>
                    {group.items.map((item, index2) => (
                      <React.Fragment key={index2}>
                        <Link href={item.to} onClick={showLess} passHref>
                          <span
                            className={`sideBar__item flex items-center px-6 py-4 cursor-pointer ${
                              pathname === item.to
                                ? "sideBar__item active"
                                : "sideBar__item"
                            }`}
                          >
                            <div className="relative">
                              <item.icon className="icon" />
                              <RingGMobile className="ringIcon" />
                            </div>
                            <motion.p
                              animate={controlText}
                              className="sideBar__text ml-6 text-b3 text-sideText"
                            >
                              {" "}
                              {item.title}
                            </motion.p>
                          </span>
                        </Link>
                        {<Separator />}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
            <div>
              <motion.div animate={controlText}>
                {chanel.map((group, index) => (
                  <div key={index}>
                    <motion.p
                      animate={controlTitleText}
                      className="my-[14px] ml-4 flex items-center gap-x-2 px-2 text-sm font-bold text-white"
                    >
                      <Link href={"/channel"} onClick={showLess} passHref>
                        <span className="flex items-center gap-x-2">
                          {group.name} <ChevronRight />
                        </span>
                      </Link>
                    </motion.p>

                    {group.items.map((item, index2) => (
                      <React.Fragment key={index2}>
                        <Link href={item.to} onClick={showLess} passHref>
                          <span
                            className={`sideBar__item flex items-center px-6 py-4 cursor-pointer ${
                              pathname === item.to
                                ? "sideBar__item active"
                                : "sideBar__item"
                            }`}
                          >
                            <div className="relative">
                              <item.icon className="icon" />
                              <RingGMobile className="ringIcon" />
                            </div>
                            <motion.p
                              animate={controlText}
                              className="sideBar__text ml-6 text-b3 text-sideText"
                            >
                              {" "}
                              {item.title}
                            </motion.p>
                          </span>
                        </Link>
                        {<Separator />}
                      </React.Fragment>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex text-sideText flex-wrap px-6 gap-x-2 gap-y-1 text-xs mb-10"
            animate={controlFooter}
          >
            {href.map((item) => (
              <motion.p key={item.Id} animate={controlText}>
                <Link href={item.href}>{item.title}</Link>
              </motion.p>
            ))}
            <motion.p animate={controlText} className="mt-4">
              © 2024 Roman Pestov
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
