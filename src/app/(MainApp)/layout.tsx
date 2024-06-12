"use client";

import Header from "@/components/header/header";
import HeaderMobile from "@/components/header/headerMobile";
import "@/app/globals.css";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const Router = useRouter();
  useEffect(() => {
    const status = localStorage.getItem("status");

    if (status === "blocked") {
      Router.replace("/banned");
    }
  }, []);
  return <div id="page flex-grow h-full">{children}</div>;
};

MainLayout.displayName = "MainLayout";

export default withAuth(MainLayout);
