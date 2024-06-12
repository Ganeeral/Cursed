import React from "react";

const MissionCompany = () => {
  return (
    <div className="mx-auto max-w-[1200px] mt-40">
      <div className="flex flex-col mx-6">
        <div className="flex flex-col gap-y-12 justify-start">
          <h3 className="sftext clamp-title text-lightGray flix:ml-14">
            Миссия платформы
          </h3>

          <div className="px-12 py-6 bg-background rounded-[24px] flix:rounded-[50px]">
            <div className="py-8 flex flex-col gap-y-14">
              <div className="flex flex-col gap-y-7">
                <h5 className="textGradient textAboutClamp">
                  В чем заключается наша миссия?
                </h5>
                <p className="text-lightGray text-display-1 flix:text-display-2 sftext">
                  Наша миссия заключается в том, чтобы дать каждому возможность
                  высказаться и показать ему мир.
                </p>
              </div>
              <div className="flex flex-col gap-y-7">
                <h5 className="textGradient textAboutClamp">
                  Во что мы верим?
                </h5>
                <p className="text-lightGray text-display-1 flix:text-display-2 sftext">
                  Мы верим, что каждый человек имеет право на свой голос, и что
                  мир становится лучше, когда мы активно слушаем, обмениваемся и
                  создаем сообщество с помощью наших историй.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCompany;
