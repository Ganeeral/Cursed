import React, { useState } from "react";

interface DropdownVideoProps {
  videoId: number;
  onApprove: () => Promise<void>;
  onDelete: () => Promise<void>;
  watch: () => void;
}

const DropdownReports: React.FC<DropdownVideoProps> = ({
  videoId,
  onApprove,
  onDelete,
  watch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    fetch(`http://Flixx/src/api/Report.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: videoId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onDelete();
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.error("Ошибка при удалении видео:", error));
  };

  const handleApprove = () => {
    fetch(`http://Flixx/src/api/deleteReports.php`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: videoId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onApprove();
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.error("Ошибка при удалении жалоб:", error));
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
        <div className="absolute z-10 mt-2 w-48 right-[2px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => {
                handleDelete();
                toggleDropdown();
              }}
              className="block text-left w-full px-4 py-2 text-sm hover:bg-gray-200"
            >
              <p className="text-black">Заблокировать</p>
            </button>
            <button
              onClick={() => {
                handleApprove();
                toggleDropdown();
              }}
              className="block text-left w-full px-4 py-2 text-sm hover:bg-gray-200"
            >
              <p className="text-black">Без обнаруженных жалоб</p>
            </button>
            <button
              onClick={() => {
                watch();
                toggleDropdown();
              }}
              className="block text-left w-full px-4 py-2 text-sm hover:bg-gray-200"
            >
              <p className="text-black">Смотреть</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownReports;
