"use client";

import React from "react";
import { CreateVideoIcon, BellIcon } from "@/ui/icons";
import Link from "next/link";
import Dropdown from "../dropDownList/DropDownList";

const headerLinks = () => {
  return (
    <>
      <div className="flex gap-x-[20px] items-center">
        <Link href={"/add"}>
          <CreateVideoIcon />
        </Link>
        <Link href={"/"}>
          <BellIcon />
        </Link>
        <Dropdown />
      </div>
    </>
  );
};

export default headerLinks;
