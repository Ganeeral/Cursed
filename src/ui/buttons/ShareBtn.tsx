import React from "react";
import { ShareIcon } from "../icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShareBtn: React.FC = () => {
  const handleShare = () => {
    const currentUrl = window.location.href;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = "sms:&body=" + encodeURIComponent(currentUrl);
    } else {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast.success("Ссылка скопирована в буфер обмена!");
        })
        .catch((error) => {
          console.error("Не удалось скопировать ссылку: ", error);
        });
    }
  };

  return (
    <div>
      <button
        onClick={handleShare}
        className="flex px-[14px] py-[11.5px] items-center gap-x-3 gradientBtn rounded-lg min-w-[137px] max-h-[40px]"
      >
        <ShareIcon />
        <span className="text-white text-xs">Поделиться</span>
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ShareBtn;
