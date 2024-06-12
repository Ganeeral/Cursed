import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

const actions = [
  { id: 1, content: "Заблокировать", action: "block" },
  { id: 2, content: "Сделать Администратором", action: "makeAdmin" },
  { id: 3, content: "Разблокировать", action: "unblock" },
];

const DropdownUser: React.FC<{ userId: number }> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleAction = (action: string) => {
    axios.post(`http://Flixx/src/api/userAction.php`, { userId, action })
      .then(response => {
        console.log("Action response:", response.data);
        // Здесь можно добавить логику обновления состояния после выполнения действия
      })
      .catch(error => {
        console.error("Ошибка выполнения действия:", error);
      });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border-2 px-2 py-2 mobile:px-5 mobile:py-4 rounded-lg bg-inherit whitespace-nowrap border-[#000]"
      >
        Действие
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 right-[2px] rounded-md shadow-lg blurBgDrop ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {actions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleAction(item.action)}
                className="block px-4 py-2 text-sm blurHover w-full text-left"
              >
                <p className="text-blacked">{item.content}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
