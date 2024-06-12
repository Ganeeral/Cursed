import { IllustarionIcon } from "@/ui/icons";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import axios from "axios";

const AdminGreeting: React.FC = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get("http://Flixx/src/api/getPendingVideos.php");
        setPendingCount(response.data.length);
      } catch (error) {
        console.error("Ошибка при загрузке количества видео на проверку:", error);
      }
    };

    fetchPendingCount();
  }, []);

  useEffect(() => {
    const fetchReportCount = async () => {
      try {
        const response = await axios.get("http://Flixx/src/api/getVideoReports.php");
        setReportsCount(response.data.length);
      } catch (error) {
        console.error("Ошибка при загрузке количества видео на проверку:", error);
      }
    };

    fetchReportCount();
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col gap-y-9 mt-6 w-full justify-center items-center",
        "md-tablet:flex-row-reverse md-tablet:items-start md-tablet:justify-between"
      )}
    >
      <div className="flex gap-x-6 w-full justify-center items-center tablet:justify-end">
        <div
          className={cn(
            "w-full max-w-full flex gap-x-2 px-2 py-3 justify-center items-center bg-lightGray rounded-xl",
            "mobile:px-4 mobile:py-5",
            "md-tablet:w-[240px]"
          )}
        >
          <span className="baloo text-display-3 clamp-title">{pendingCount}</span>
          <p className={cn("text-xs", "mobile:text-sm", "flix:text-base")}>
            Видео на <br /> проверку
          </p>
        </div>
        <div
          className={cn(
            "w-full max-w-full flex gap-x-2 px-2 py-3 justify-center items-center bg-lightGray rounded-xl",
            "mobile:px-4 mobile:py-5",
            "md-tablet:w-[240px]"
          )}
        >
          <span className="baloo text-display-3 clamp-title">{reportsCount}</span>
          <p
            className={cn(
              "text-xs whitespace-nowrap",
              "mobile:text-sm",
              "flix:text-base"
            )}
          >
            Жалобы на <br /> видео
          </p>
        </div>
      </div>
      <div className="w-full flex py-9 px-5 relative items-center bg-lightGray rounded-xl md-tablet:max-w-[680px]">
        <p className="clamp-text text-display-1">
          Добро <br className="md-mobile:hidden " /> пожаловать, <br />
          <span className="baloo">Admin</span>
        </p>

        <IllustarionIcon className="max-w-[175px] min-w-[93px] w-[20vw] max-h-[191px] min-h-[91px] absolute right-3 bottom-0" />
      </div>
    </div>
  );
};

export default AdminGreeting;
