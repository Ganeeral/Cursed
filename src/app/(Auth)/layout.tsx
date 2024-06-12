"use client";

import "@/app/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user_id");

    if (user) {
      Router.replace("/");
    }
  }, []);
  return <div id="page">{children}</div>;
}
