"use client"

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/searchbar/search";
import HeaderLinks from "../headerLinks/headerLinks";
import SideBar from "@/components/sidebar/Sidebar";

const Header = () => {

  return (
    <header className={`fixed hidden tablet-s:block top-0 w-full z-20 transitionBg bg-background`}>
      <div className="flex justify-between">
        <div className="max-w-[248px] w-full">
          <SideBar />
        </div>
        <div className="flex-grow contents text-center">
          <SearchBar />
        </div>
        <div className="mt-[18px] mr-[30px] ml-[56px]">
          <HeaderLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;