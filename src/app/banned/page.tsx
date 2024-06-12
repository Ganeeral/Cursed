"use client"

import React from "react";
import { useRouter } from "next/navigation";

const BannedUserPage = () => {
  const { push } = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("status");
    localStorage.removeItem("role");
    push("/auth");
  };
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="max-w-md mx-4 p-8 bg-[#292929] rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-6"></div>
        <h1 className="text-3xl font-bold text-center text-lightGray mb-4">
          Доступ запрещен
        </h1>
        <p className="text-lightGray text-center mb-6">
          К сожалению, ваш доступ к этому ресурсу был ограничен. Если вы
          считаете, что это произошло по ошибке, пожалуйста, свяжитесь с нашей
          службой поддержки.
        </p>
        <div className="flex justify-center">
          <a
            href="mailto:example@gmail.com"
            onClick={handleLogout}
            className="px-4 py-2 gradientBtn text-white rounded-md hover:bg-blue-600 transition-colors duration-300 text-center"
          >
            Связаться с поддержкой / выйти
          </a>
        </div>
      </div>
    </div>
  );
};

export default BannedUserPage;
