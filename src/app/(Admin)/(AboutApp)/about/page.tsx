"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import HeaderAbout from "@/components/header/headerAbout";
import BannerAbout from "@/sections/BannerAbout/BannerAbout";
import AboutCompany from "@/sections/AboutCompany/AboutCompany";
import MissionCompany from "@/sections/MissionCompany/MissionCompany";
import CuriousAbout from "@/sections/CuriousAbout/CuriousAbout";
import FooterAbout from "@/sections/FooterAbout/FooterAbout";

const Page = () => {
  return (
    <div className="bg-backgroundAbout h-full">
      <HeaderAbout />
      <BannerAbout />
      <AboutCompany />
      <MissionCompany />
      <CuriousAbout />
      <FooterAbout />
    </div>
  );
};

export default Page;
