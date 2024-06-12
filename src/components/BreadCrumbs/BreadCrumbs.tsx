import Link from "next/link";
import React from "react";

const BreadCrumbs = () => {
  return (
    <div className="flex gap-x-2 items-center mt-14 overflow-hidden">
      <Link
        className="textGradient text-xl whitespace-nowrap overflow-hidden overflow-ellipsis"
        href="/about"
      >
        Главная
      </Link>

      <div className="text-lightGray">/</div>

      <Link
        className="text-lightGray text-xl whitespace-nowrap overflow-hidden overflow-ellipsis"
        href="/privacy-policy"
      >
        Политика
      </Link>
    </div>
  );
};

export default BreadCrumbs;
