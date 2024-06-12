import React, { useState } from "react";
import Link from "next/link";

interface DropdownVideoProps {
  approve: () => void;
  onDelete: () => void;
  watch: () => void;
}

const DropdownVideo: React.FC<DropdownVideoProps> = ({ approve, onDelete, watch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
            <button onClick={() => { approve(); toggleDropdown(); }} className="block text-left w-full px-4 py-2 text-sm blurHover">
              <p className="text-blacked">Подтвердить</p>
            </button>
            <button onClick={() => { onDelete(); toggleDropdown(); }} className="block text-left w-full px-4 py-2 text-sm blurHover">
              <p className="text-blacked">Удалить</p>
            </button>
            <button onClick={() => { watch(); toggleDropdown(); }} className="block text-left w-full px-4 py-2 text-sm blurHover">
              <p className="text-blacked">Смотреть</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownVideo;
