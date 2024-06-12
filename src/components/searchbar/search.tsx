"use client";

import React, { useState, useEffect } from "react";
import SearchIcon from "@/ui/icons/SearchIcon.svg";
import { words } from "../lib/data";
import cn from "classnames";

const SearchBar = () => {
  const [activeSearch, setActiveSearch] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isFullSearch, setIsFullSearch] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 789);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setActiveSearch([]);
      return;
    }
    setActiveSearch(
      words
        .filter((word) => word.toLowerCase().includes(searchValue))
        .slice(0, 8)
    );
  };

  const toggleMobileSearch = () => {
    setIsFullSearch(true);
  };

  const closeFullSearch = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsFullSearch(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <div onClick={toggleMobileSearch}>
          <SearchIcon />
        </div>
      ) : (
        <form className="relative flex w-[400px] tablet-s:mt-[14px] tablet-s:mb-[14px]">
          <div className="input__container max-w-[1000px] flex w-full relative">
            <input
              type="search"
              placeholder="Введите запрос.."
              className={cn(
                "max-w-[380px] w-full p-[12px] bg-inherit text-sideText outline-none"
              )}
              onChange={handleSearch}
            />
            <button className="absolute right-[4px] top-1/2 -translate-y-1/2 p-[12px] bg-inherit border-[1px] input__container  rounded-full mobile:p-[10px]">
              <SearchIcon />
            </button>
          </div>

          {activeSearch.length > 0 && (
            <div className="blurBg absolute top-20 p-4 bg-sideText text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
              {activeSearch.map((searchItem, index) => (
                <span key={index}>{searchItem}</span>
              ))}
            </div>
          )}
        </form>
      )}

      {isFullSearch && (
        <div
          className="fixed inset-0 flex items-center justify-center blurBg  bg-opacity-50"
          onClick={closeFullSearch}
        >
          <form
            className=" relative bg-inherit rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="input__container relative">
              <input
                type="search"
                placeholder="Введите запрос"
                className="max-w-[380px] w-full p-[12px] rounded-[30px] bg-inherit text-searchText outline-none"
                onChange={handleSearch}
              />
              <button className="input__container absolute right-[4px] top-1/2 -translate-y-1/2 p-[12px]  mobile:p-[10px]">
                <SearchIcon />
              </button>
            </div>

            {activeSearch.length > 0 && (
              <div className="mt-4 flex flex-col">
                {activeSearch.map((searchItem, index) => (
                  <span key={index}>{searchItem}</span>
                ))}
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default SearchBar;
