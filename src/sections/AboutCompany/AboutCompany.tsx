import React from "react";

const AboutCompany = () => {
  return (
    <div className="mx-6 flex justify-center items-center mt-5">
      <div className="flex flex-col tablet:flex-row gap-y-6 tablet:gap-x-6 justify-between w-full max-w-[1200px]  text-lightGray">
        <div className="flex flex-col gap-y-2">
          <p className="sftext text-xs leading-8 uppercase">Кто мы такие?</p>
          <h2 className="textAbout-clamp sftext ">
            Система <br className="hidden tablet:block" /> видеохостинга
          </h2>
        </div>

        <div className="tablet:max-w-[524px]">
          <h5 className="text-xl leading-8 sftext">
            Мы предоставляем платформу, где каждый может выразить себя, где люди
            могут делиться своими видео и эмоциями, создавая уникальные{" "}
            <br className="hidden tablet:block" />
            видео-контенты для всех.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;
