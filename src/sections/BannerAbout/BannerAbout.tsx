import SnapSliider from "@/components/SnapSlider/SnapSliider";
import React from "react";

const BannerAbout = () => {
  return (
    <div className="h-[100vh] flix:h-[100vh] grid place-items-center">
      <div className="flex h-full justify-center bg-backgroundAbout absolute overflow-hidden flix:overflow-visible w-full">
        <div className="absolute top-0 left-0 h-full w-full z-0">
          <div className="bg-transparent h-full transition-all duration-200 ease-linear opacity-75">
            <video
              autoPlay
              playsInline
              muted
              loop
              width="100%"
              height="100%"
              className="scale-150 mobile:scale-100 mt-6 mx-auto max-w-[700px] aspect-square flix:mt-0"
            >
              <source src="/video/videobg.webm" type="video/webm" />
            </video>
          </div>
        </div>
        <div className="flex flex-col gap-y-52">
          <div className="flex translate-y-16 flix:translate-y-32 flex-col z-20">
            <span className="text-textGray sftext clampSpanAboutContainer">
              Сохраняем
            </span>
            <div className="flex items-center">
              <h2 className="hidden tablet-lg:block text-xl leading-8 mt-4 text-textGray">
                Мы <span className="baloo">FLIX</span> — уникальный <br />{" "}
                видеохостинг
              </h2>
              <span className="text-textGray sftext clampSpanAboutContainer mobile-lg:ml-64 ml-0 tablet-lg:ml-16 flix:leading-5">
                каждый
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-textGray sftext clampSpanAboutContainer mobile:mr-28 ">
                миг
              </span>
              <h2 className="hidden mobile-lg:block tablet-lg:hidden text-xl leading-8 mt-4 text-textGray">
                Мы <span className="baloo">FLIX</span> — уникальный <br />{" "}
                видеохостинг
              </h2>
            </div>
            <div className="flex justify-end translate-y-[-10px]">
              <h2 className="mobile-lg:hidden text-xl leading-8 mt-4 text-textGray">
                Мы <span className="baloo">FLIX</span> — уникальный <br />{" "}
                видеохостинг
              </h2>
            </div>
          </div>
        <SnapSliider />
        </div>
      </div>
    </div>
  );
};

export default BannerAbout;
