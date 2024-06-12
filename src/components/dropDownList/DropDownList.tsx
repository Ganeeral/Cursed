import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "@/types/user";

const Dropdown: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { push } = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("status");
    localStorage.removeItem("role");
    push("/auth");
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function fetchUserDetails() {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }
      try {
        const response = await fetch(
          "http://Flixx/src/api/getUserDetails.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          }
        );
        const data = await response.json();
        if (data && !data.message) {
          setUser(data);
        } else {
          console.error("Пользователь не найден");
        }
      } catch (error) {
        console.error("Ошибка получения данных о пользователе:", error);
      }
    }

    fetchUserDetails();
  }, []);

  return (
    <div className="relative">
      <div className="h-10 w-10 rounded-full relative">
        {user && (
          <Image
            src={user.author_avatar}
            alt=""
            fill
            onClick={toggleDropdown}
            className="rounded-full object-center object-cover w-[40px] cursor-pointer"
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 right-[2px] rounded-md shadow-lg blurBg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              onClick={toggleDropdown}
              className="block px-4 py-2 text-sm hover:bg-activeDrop"
              href="/channel"
            >
              <p className="textGradient">Канал</p>
            </Link>
            <Link
              onClick={toggleDropdown}
              className="block px-4 py-2 text-sm hover:bg-activeDrop"
              href="/channel/edit"
            >
              <p className="textGradient">Ред. канал</p>
            </Link>
            <Link
              onClick={toggleDropdown}
              className="block px-4 py-2 text-sm hover:bg-activeDrop"
              href="/subscriptions"
            >
              <p className="textGradient">Подписки</p>
            </Link>
            <a
              className="cursor-pointer block px-4 py-2 text-sm hover:bg-activeDrop"
              onClick={handleLogout}
            >
              {" "}
              <p className="textGradient">Выйти</p>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
