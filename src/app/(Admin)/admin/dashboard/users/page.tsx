"use client";

import React from "react";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { SearchAdminIcon } from "@/ui/icons";
import DropdownUser from "@/components/dropDownList/DropDownUser";
import { User } from "@/types/user";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Ошибка загрузки данных");
  }
  const data = await response.json();
  return data;
};

const Page = () => {
  const pathname = usePathname();
  const { data: users, error: userError } = useSWR(
    "http://Flixx/src/api/getUsers.php",
    fetcher
  );

  if (userError) {
    return <div>Ошибка загрузки пользователей: {userError.message}</div>;
  }

  return (
    <div className="mt-8 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-6 flix:flex-row flix:justify-between flix:w-full flix:items-center">
        <h4 className="text-display-1">Пользователи</h4>
        <div className="flex items-center p-3 gap-x-1 bg-lightGray rounded-lg w-full flix:max-w-[290px]">
          <div className="">
            <SearchAdminIcon />
          </div>
          <input
            type="text"
            placeholder="Введите логин пользователя"
            className="placeholder:text-searchText placeholder:text-base bg-inherit outline-none text-searchText text-xs mobile:text-base w-full"
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-y-5">
        {users &&
          users.map((user: User) => (
            <div
              key={user.id}
              className="flex w-full items-center justify-between p-2 bg-lightGray rounded-xl"
            >
              <div className="flex gap-x-6 items-center">
                <Image
                  src={user.preview}
                  alt=""
                  layout="responsive"
                  width={100}
                  height={100}
                  className="min-w-[64px] max-w-[64px] min-h-[64px] rounded-xl object-cover object-center"
                />
                <div className="flex flex-col gap-y-2">
                  <div className="text-sm line-clamp-1 overflow-hidden flex gap-x-2">
                    <div>{user.username}</div>
                    <div className="text-red-700">{user.role}</div>
                  </div>
                  <div className="text-[10px] mobile:text-xs flex gap-x-1 flex-wrap line-clamp-2 overflow-hidden">
                    Дата регистрации:{" "}
                    <span className="text-[#5A5A5A] text-[10px] bg-[#D9D9D9] rounded px-2 py-[2px]">
                      {user.date}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownUser userId={user.id} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
