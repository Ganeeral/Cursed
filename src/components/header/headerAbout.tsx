"use client";

import { SidebarAbout } from "@/components/sidebar/SidebarAbout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    name: "О сервисе",
    href: "/about",
  },
  {
    id: 2,
    name: "Политика",
    href: "/privacy-policy",
  },
];

const HeaderAbout = () => {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolledDown(scrollY > prevScrollY);
      setPrevScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  const headerStyle = {
    transform: isScrolledDown ? "translateY(-500%)" : "",
    transition: "transform 0.5s ease",
  };
  return (
    <>
      <header
        className="flex justify-center items-center top-4 w-full z-[99] width__header stickyHeader"
        style={headerStyle}
      >
        <div className="flex items-center gap-x-4 px-10 py-4 max-w-[695px] w-full rounded-[100px] relative">
          <div className="absolute inset-0 bg-lightHeader rounded-[100px] backdrop z-0"></div>
          <div className="flex mobile:justify-between w-full items-center">
            <Link className="z-50" href="/about">
              <motion.svg
                whileHover={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.2, repeat: 1 }}
                width="45"
                height="65"
                viewBox="0 0 55 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.634041 62.8332C0.523572 62.891 0.454346 63.0053 0.454346 63.1297V71.6583C0.454346 71.7967 0.539774 71.9211 0.669391 71.9705L7.43387 74.5551C7.53781 74.5948 7.65417 74.5801 7.74507 74.5163L34.1275 56.0232C34.3466 55.8701 34.3058 55.5342 34.0566 55.4377L23.1556 51.2119C23.0657 51.1774 22.9651 51.1828 22.8797 51.2274L0.634041 62.8332Z"
                  fill="url(#paint0_linear_885_65)"
                />
                <path
                  d="M19.5008 45.3242C19.5008 45.4486 19.4316 45.563 19.3211 45.6205L0.930903 55.213C0.708282 55.3289 0.441895 55.1673 0.441895 54.9161V3.5408C0.441895 3.40695 0.521643 3.28598 0.644737 3.23334L7.05024 0.493481C7.15671 0.447905 7.27917 0.460783 7.37428 0.527548L19.359 8.96801C19.4482 9.03051 19.5008 9.13256 19.5008 9.24134V45.3242Z"
                  fill="url(#paint1_linear_885_65)"
                />
                <path
                  d="M26.6133 14.0767C26.3917 13.9207 26.0864 14.0792 26.0864 14.3502V45.0106C26.0864 45.1489 26.171 45.2726 26.3 45.3227L41.0336 51.0406C41.1377 51.0809 41.2551 51.0666 41.3469 51.0023L54.3041 41.891C54.3934 41.8285 54.4464 41.7265 54.4464 41.6175V33.8527C54.4464 33.7437 54.3934 33.6416 54.3046 33.5791L26.6133 14.0767Z"
                  fill="url(#paint2_linear_885_65)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_885_65"
                    x1="17.3622"
                    y1="51.1895"
                    x2="17.3622"
                    y2="74.5771"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F8436E" />
                    <stop offset="1" stopColor="#9C3173" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_885_65"
                    x1="9.97135"
                    y1="0.466553"
                    x2="9.97135"
                    y2="55.2512"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F8436E" />
                    <stop offset="1" stopColor="#9C3173" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear_885_65"
                    x1="40.2664"
                    y1="14.0151"
                    x2="40.2664"
                    y2="51.0632"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F8436E" />
                    <stop offset="1" stopColor="#9C3173" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </Link>

            <div className="gap-x-3 hidden mobile-lg:flex z-10">
              {data.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-base leading-5 text-white hover:bg-searchText py-5 px-5 rounded-[50px] transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button className="hidden mobile-lg:block mx-auto mobile-lg:mx-0 gradientBtn py-4 px-10 rounded-[50px] text-white z-10">
              Попробовать
            </button>
          </div>
          <SidebarAbout />
        </div>
      </header>
    </>
  );
};

export default HeaderAbout;
