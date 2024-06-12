import React from "react";

const CuriousAbout = () => {
  return (
    <div className="relative flex justify-center overflow-hidden h-[70vh]">
      <div className="absolute top-0 left-0 h-full w-full z-0">
        <div className="bg-transparent h-full transition-all duration-200 ease-linear opacity-75">
          <video
            autoPlay
            playsInline
            muted
            loop
            width="100%"
            height="100%"
            className="scale-[2.5] mobile:scale-[3] mt-6 mx-auto max-w-[700px] aspect-square flix:mt-0"
          >
            <source src="/video/spline.webm" type="video/webm" />
          </video>
        </div>
      </div>
      <div className="flex justify-center flix:mt-48 items-center mx-6">
        <div className="max-w-[1200px] p-8 mobile:p-16 backdrop-blur-lg rounded-[48px]">
          <div className="flex justify-start items-start flex-col gap-y-9">
            <h6 className="textGradient textAbout-clamp">Любопытно?</h6>
            <p className="sftext text-lightGray text-2xl flix:text-3xl">
              Не ждите — давайте вместе отправимся в захватывающее цифровое
              путешествие.
            </p>
            <button className="mx-auto w-full flix:w-min mobile-lg:mx-0 gradientBtn py-4 px-10 rounded-[50px] text-white z-10">
              Попробовать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuriousAbout;
