import React, { useState } from "react";
import Link from "next/link";

const data = [
  {
    id: 1,
    content: "Заблокировать",
    href: "/admin/dashboard/videos",
  },
  {
    id: 2,
    content: "Посмотреть",
    href: "/admin/dashboard/videos",
  },
  {
    id: 3,
    content: "Без обнаруженных жалоб",
    href: "/admin/dashboard/videos",
  },
];

const DropdownBtn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border-2 px-5 py-3 rounded-lg bg-inherit whitespace-nowrap border-[#000]"
      >
        Действие
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 right-[2px] rounded-md shadow-lg blurBgDrop ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {data.map((item) => (
              <Link
                key={item.id}
                onClick={toggleDropdown}
                className="block px-4 py-2 text-sm blurHover"
                href={item.href}
              >
                <p className="text-blacked">{item.content}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownBtn;
