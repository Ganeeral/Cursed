"use client";

import React, { useEffect, useState } from "react";
import {
  CrownIcon,
  CursedMen,
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  MoonIcon,
  TwitterIcon,
  WolfIcon,
  DecorIcon,
  BorderIcon,
  Sticker1Icon,
  CursedLogo,
} from "@/ui/icons";
import HeaderCursed from "@/components/header/headerCursed";
import Image from "next/image";
import Link from "next/link";
import BannerCursed from "@/components/BannerCursed/BannerCursed";
import { motion, useScroll, useTransform } from "framer-motion";
import CursedIntroduction from "@/sections/CursedIntroduction/CursedIntroduction";
import Footer from "@/components/footer/footer";
import axios from "axios";

const imageData = [
  {
    src: "/images/Cursed1.png",
    alt: "Пробуждение",
    title: "Пробуждение",
    description:
      "Герой направляется в Тёмные Леса, где находится первая из четырёх священных реликвий, необходимых для закрытия Проклятых Врат.",
  },
  {
    src: "/images/Cursed2.png",
    alt: "Путешествие через Тёмные Леса",
    title: "Путешествие через Тёмные Леса",
    description:
      "Герой пробуждается в древнем храме, не помня своего прошлого. В храме он находит первые указания на древний культ, стремящийся пробудить зловещую силу.",
  },
  {
    src: "/images/Curse3.png",
    alt: "Руины Забытого Города",
    title: "Руины Забытого Города",
    description:
      "Следующие подсказки ведут героя в руины древнего города, который скрывает вторую реликвию.",
  },
  {
    src: "/images/Cursed4.png",
    alt: " Глубины Подземного Лабиринта",
    title: " Глубины Подземного Лабиринта",
    description:
      "Третья реликвия находится в глубинах подземного лабиринта, наполненного ловушками и охраняемого мощными созданиями.",
  },
  {
    src: "/images/Cursed5.png",
    alt: "Оплот Культа",
    title: "Оплот Культа",
    description:
      "Герой находит оплот культа, где готовится ритуал для пробуждения зловещей силы. Здесь хранится последняя реликвия.",
  },
  {
    src: "/images/Cursed6.png",
    alt: "Проклятые Врата",
    title: "Проклятые Врата",
    description:
      "С реликвиями в руках, герой отправляется к Проклятым Вратам, чтобы закрыть их и предотвратить катастрофу.",
  },
];

interface Sticker {
  id: number;
  name: string;
  photo: string;
}

const App = () => {
  const [sticker, setSticker] = useState<Sticker[]>([]);

  useEffect(() => {
    axios
      .get("http://Cursed/src/api/getVideos.php")
      .then((response) => {
        setSticker(response.data);
      })
      .catch((error) => console.error("Ошибка при загрузке стикеров:", error));
  }, []);

  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 1000], [1, 0]);
  const translateX = useTransform(scrollY, [0, 1000], [0, 97]);

  const [isTabletOrLarger, setIsTabletOrLarger] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletOrLarger(window.innerWidth >= 1340);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <HeaderCursed />
      <motion.section style={{ opacity }}>
        <BannerCursed />
      </motion.section>

      <section id="banner" className="bannerCursed">
        <CursedIntroduction />
      </section>

      <section className="mt-20 relative h-[265vh]">
        <div className="-z-[10] sticky top-0 mb-32">
          <WolfIcon className="absolute left-[-143%] tablet-s:left-[-23%] scale-75 mobile:scale-100" />
          <MoonIcon className="absolute -z-10 left-[0] mobile:left-[23%] top-[50px] scale-75 mobile:scale-100" />
        </div>

        <div className="container-main px-10 flex justify-center md-tablet:justify-end w-full">
          <div className="max-w-[580px] w-full flex justify-center items-center flex-col gap-y-12">
            <div className="flex flex-col items-center gap-y-6">
              <CrownIcon />
              <p className="text-center text-4xl font-bold text-white">
                The Cursed Gate <br /> история
              </p>
            </div>
            <div className="flex flex-col items-center gap-y-6 w-full">
              <div className="w-full h-1 bg-white opacity-35"></div>
              <p className="text-white text-center max-w-[500px] text-xl">
                {" "}
                Герою предстоит столкнуться с древним культом, стремящимся
                пробудить зловещую силу, способную уничтожить мир. Расследуя
                странные события и встречая старых и новых союзников, герой
                будет следовать по следам культистов, сражаться с их
                приспешниками и раскрывать мистические тайны, которые приведут
                его к эпической финальной битве.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex container-main flex-col gap-y-4">
            {imageData.map((item, index) => (
              <div
                key={index}
                className="px-10 flex-col md-tablet:flex-row flex items-center justify-between w-full"
              >
                <motion.div
                  className="z-20 solid stroke-black max-w-[610px] mb-4 w-full"
                  style={
                    isTabletOrLarger && index % 2 === 0 ? { x: translateX } : {}
                  }
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={610}
                    height={340}
                  />
                </motion.div>
                <div className="max-w-[580px] w-full flex justify-center items-center flex-col gap-y-12">
                  <div className="flex flex-col items-center gap-y-6 w-full">
                    <p className="text-center text-2xl font-bold text-white">
                      {item.title}
                    </p>
                    <p className="text-white text-center max-w-[500px] text-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mt-64">
        <div className="flex justify-between w-full">
          <div className="-translate-y-13 mx-auto tablet-s:ml-48 flex items-center text-yellow-cream font-black rotate-[-25deg]">
            <div className="vwText text-[12vw] mobile:text-[12vw] tablet-lg:text-[6vw]">
              С
            </div>
            <div className="vwText text-[12vw] -translate-y-4 mobile:text-[12vw] tablet-lg:text-[6vw]">
              Т
            </div>
            <div className="vwText text-[12vw] translate-y-1 mobile:text-[12vw] tablet-lg:text-[6vw]">
              И
            </div>
            <div className="vwText text-[12vw] -translate-y-4 mobile:text-[12vw] tablet-lg:text-[6vw]">
              К
            </div>
            <div className="vwText text-[12vw] translate-y-1 mobile:text-[12vw] tablet-lg:text-[6vw]">
              Е
            </div>
            <div className="vwText text-[12vw] -translate-y-4 mobile:text-[12vw] tablet-lg:text-[6vw]">
              Р
            </div>
            <div className="vwText text-[12vw] -translate-y-4 mobile:text-[12vw] tablet-lg:text-[6vw]">
              Ы
            </div>
            <div className="vwText text-[12vw] -translate-y-2 mobile:text-[12vw] tablet-lg:text-[6vw]">
              !
            </div>
            <div className="vwText text-[12vw] translate-y-2 mobile:text-[12vw] tablet-lg:text-[6vw]">
              !
            </div>
          </div>
          <DecorIcon className="hidden tablet-s:block" />
        </div>
        <div className="container-main">
          <div className="mt-40 justify-center flex place-items-center gap-x-16 gap-y-10 flex-wrap">
            {sticker.map((sticker: Sticker) => (
              <div key={sticker.id} className="flex flex-col gap-y-2">
                <p className="text-yellow-cream font-black text-2xl">
                  {sticker.name}
                </p>
                <div className="relative flex justify-center items-center">
                  <BorderIcon className="w-full h-full" />
                  <Image
                    className="absolute"
                    src={sticker.photo}
                    alt={sticker.name}
                    width={380}
                    height={348}
                  />
                </div>
                <div className="z-20 max-w-[613px] w-full relative flex flex-col justify-center items-center gap-y-6 mx-auto">
                  <a
                    href={sticker.photo}
                    download
                    className="btn-background cursor-pointer z-[99]"
                  >
                    <div className="flex justify-center items-center h-full z-[99]">
                      <p className="font-bold text-xl uppercase text-yellow-cream">
                        Скачать!
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default App;
