import AboutPolicy from "@/components/AboutPolicy/AboutPolicy";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import HeaderAbout from "@/components/header/headerAbout";
import FooterAbout from "@/sections/FooterAbout/FooterAbout";
import PrivacySection from "@/sections/PrivacySection/PrivacySection";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="bg-backgroundAbout h-full">
        <HeaderAbout />
        <div className="max-w-[1200px] mx-auto">
          <div className="mx-6">
            <BreadCrumbs />
            <AboutPolicy />
            <PrivacySection />
          </div>
        </div>
        <FooterAbout />
      </div>
    </>
  );
};

export default Page;
