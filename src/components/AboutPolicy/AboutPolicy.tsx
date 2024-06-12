import React from "react";

const AboutPolicy = () => {
  return (
    <div className="my-10 flex flex-col gap-y-10">
      <h2 className="sftext text-lightGray clampTitle">
        Политика конфиденциальности & Авторские права
      </h2>

      <p className="clampP text-lightGray sftext">
        <span className="textGradient font-semibold">
          Ваша конфиденциальность важна для нас.
        </span>{" "}
        <br /> Поэтому мы хотели бы проинформировать вас{" "}
        <br className="hidden md-tablet:block" /> нашей политике
        конфиденциальности.
      </p>

      <div className="border divide-solid opacity-10"></div>
    </div>
  );
};

export default AboutPolicy;
