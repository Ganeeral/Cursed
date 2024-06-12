import { CursedMen } from "@/ui/icons";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CursedIntroduction: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [200, -400]);
  const y2 = useTransform(scrollY, [0, 2000], [200, -350]);
  const y3 = useTransform(scrollY, [0, 2000], [200, -300]);
  const y4 = useTransform(scrollY, [0, 2000], [200, -300]);
  const y5 = useTransform(scrollY, [0, 2000], [200, -300]);

  return (
    <div className="flex relative justify-between container-main items-center p-4 tablet-lg:p-10">
      <div className="flex flex-col gap-y-20 z-10">
        <motion.div
          style={{ y: y1 }}
          className="bg-beige-cream max-w-max max-h-[270px] h-full w-full stroke-black inside p-12"
        >
          <p className="clampText font-bold">
            <span className="clampTextH">Д</span>ревнее зло <br /> живет в мире
          </p>
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="bg-beige-cream max-w-max max-h-[110px] h-full w-full stroke-black inside p-4 ml-[45vw]"
        >
          <p className="clampText font-bold">И жаждет</p>
        </motion.div>
        <motion.div
          style={{ y: y3 }}
          className="bg-beige-cream max-w-max max-h-[110px] h-full w-full stroke-black inside p-4 ml-[25vw]"
        >
          <p className="clampText font-bold">Вырваться</p>
        </motion.div>
        <div className="mobile:ml-[33vw] -translate-y-13 flex items-center text-white font-black rotate-[-25deg]">
          <div className="vwText text-[20vw] mobile:text-[12vw] tablet-lg:text-[6vw]">
            Н
          </div>
          <div className="vwText text-[20vw] -translate-y-4 mobile:text-[12vw] tablet-lg:text-[6vw]">
            A
          </div>
          <div className="vwText text-[20vw] translate-y-1 mobile:text-[12vw] tablet-lg:text-[6vw]">
            Р
          </div>
          <div className="vwText text-[20vw] -translate-y-4 mobile:text-[12vw] tablet-lg:text-[6vw]">
            У
          </div>
          <div className="vwText text-[20vw] translate-y-1 mobile:text-[12vw] tablet-lg:text-[6vw]">
            Ж
          </div>
          <div className="vwText text-[20vw] -translate-y-4 mobile:text-[12vw] tablet-lg:text-[6vw]">
            У
          </div>
          <div className="vwText text-[20vw] mobile:text-[12vw] tablet-lg:text-[6vw]">
            !
          </div>
        </div>
      </div>
      <motion.div style={{ y: y1 }}>
        <CursedMen className="absolute right-10 " />
      </motion.div>
    </div>
  );
};

export default CursedIntroduction;
