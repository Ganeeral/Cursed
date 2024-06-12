"use client";

import React, { useEffect, useState } from "react";
import SideBarMobile from "@/components/sidebar/sidebarMobile";
import SearchBar from "../searchbar/search";
import HeaderLinks from "../headerLinks/headerLinks";

const HeaderMobile = () => {
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
    transform: isScrolledDown ? "translateY(-100%)" : "",
    transition: "transform 0.5s ease",
  };

  return (
    <>
      <header
        className={`fixed tablet-s:hidden top-0 w-full z-20 bg-background`}
        style={headerStyle}
      >
        <div className="flex justify-between">
          <div>
            <SideBarMobile />
          </div>
          <div className="flex items-center py-4 px-4 gap-5">
            <SearchBar />
            <HeaderLinks />
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderMobile;
