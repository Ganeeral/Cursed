"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SearchAdminIcon } from "@/ui/icons";
import DropdownReports from "@/components/dropDownList/DropDownReports";
import videos from "@/app/(MainApp)/your-videos/page";

interface VideoReport {
  id: number;
  video_id: number;
  reporter_id: number;
  reason: string;
  report_date: string;
  title: string;
  preview: string;
  username: string;
}

const AdminPendingVideos: React.FC = () => {
  const [reports, setReports] = useState<VideoReport[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          "http://Flixx/src/api/getVideoReports.php"
        );
        setReports(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке жалоб:", error);
      }
    };

    fetchReports();
  }, []);

  const handleAction = async (action: string, id: number) => {
    try {
      if (action === "approve") {
        await axios.post("http://Flixx/src/api/deleteReports.php", {
          video_id: id,
        });
      } else if (action === "delete") {
        await axios.post("http://Flixx/src/api/Report.php", {
          video_id: id,
        });
      }
      const updatedReports = reports.filter((report) => report.id !== id);
      setReports(updatedReports);
    } catch (error) {
      console.error(
        `Ошибка при выполнении действия "${action}" для видео ID: ${id}`,
        error
      );
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-6 flix:flex-row flix:justify-between flix:w-full flix:items-center">
        <div className="flex items-center rounded-xl bg-textGray">
          <Link
            href="/admin/dashboard/videos"
            className="text-lg hover:bg-[#e4e4e4] rounded-l-lg p-3 transition-all duration-300"
          >
            проверка
          </Link>
          <Link
            href="/admin/dashboard/videos/report"
            className="text-lg hover:bg-[#e4e4e4] rounded-r-lg p-3 transition-all duration-300"
          >
            жалобы
          </Link>
        </div>
        <div className="flex items-center p-3 gap-x-1 bg-lightGray rounded-lg w-full flix:max-w-[260px]">
          <div className="">
            <SearchAdminIcon />
          </div>
          <input
            type="text"
            placeholder="Введите название видео"
            className="placeholder:text-searchText placeholder:text-base bg-inherit outline-none text-searchText text-xs mobile:text-base w-full"
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-y-5 py-4">
        {reports.length === 0 ? (
          <div className="text-center text-lg">Жалоб на видео нету</div>
        ) : (
          reports.map((report: VideoReport) => (
            <div
              key={report.id}
              className="flex w-full items-center justify-between p-2 bg-lightGray rounded-xl"
            >
              <div className="flex gap-x-6 items-center">
                <Image
                  src={report.preview}
                  alt={report.title}
                  layout="responsive"
                  width={100}
                  height={100}
                  className="min-w-[64px] max-w-[64px] min-h-[64px] rounded-xl object-cover object-center"
                />
                <div className="flex flex-col gap-y-2">
                  <div className="text-sm line-clamp-1 overflow-hidden">
                    {report.title}{" "}
                    <span className="text-[#7D7D7D] text-[10px]">
                      idVideo:{report.video_id}
                    </span>
                  </div>
                  <div className="text-xs line-clamp-1 overflow-hidden">
                    {report.username}{" "}
                    <span className="text-[#7D7D7D] text-[10px]">
                      idUser:{report.reporter_id}
                    </span>
                  </div>
                  <div className="text-xs text-red-500">
                    Причина: {report.reason}
                  </div>
                </div>
              </div>
              <DropdownReports
                videoId={report.video_id}
                onApprove={() => handleAction("approve", report.video_id)}
                onDelete={() => handleAction("delete", report.video_id)}
                watch={() => router.push(`/watch/${report.video_id}`)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPendingVideos;
