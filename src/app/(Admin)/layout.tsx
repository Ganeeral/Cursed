"use client";

import "@/app/globals.css";
import AdminGreeting from "@/components/adminGreeting/adminGreeting";
import HeaderAdmin from "@/components/header/HeaderAdmin";
import SidebarAdmin from "@/components/sidebar/SidebarAdmin";
import { useEffect, useState } from "react";
import withAuth from "@/hoc/withAuth";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useRouter } from "next/navigation";

const AdminLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role != "admin") {
      router.replace("/channel");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div id="page" className="bg-white">
      <div className="bg-white">
        <div className="flex flex-grow flex-col mx-8">
          <HeaderAdmin
            isOpen={isOpen}
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
          />
          <div className="flex flix:gap-x-12">
            <SidebarAdmin
              isOpen={isOpen}
              isMobile={isMobile}
              toggleSidebar={toggleSidebar}
            />
            <div className="w-full flex-grow flex flex-col">
              <AdminGreeting />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminLayout);
