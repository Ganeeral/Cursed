import React, { useState } from "react";
import Modal from "react-modal";

interface ReportButtonProps {
  videoId: number;
  userId: string;
}

const ReportButton: React.FC<ReportButtonProps> = ({ videoId, userId }) => {
  const [reason, setReason] = useState("");
  const [reportStatus, setReportStatus] = useState<null | string>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleReport = () => {
    fetch(`http://Flixx/src/api/reportVideo.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, video_id: videoId, reason }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReportStatus("Жалоба успешно отправлена");
        } else {
          setReportStatus("Ошибка при отправке жалобы");
        }
        setReason(""); 
        setModalIsOpen(false); 
      })
      .catch((error) => {
        console.error("Ошибка при отправке жалобы:", error);
        setReportStatus("Ошибка при отправке жалобы");
        setModalIsOpen(false); 
      });
  };

  return (
    <div className="report-button">
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
      >
        Пожаловаться
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Report Video"
        className="fixed inset-0 flex items-center justify-center  bg-black backdrop-blur-sm bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Пожаловаться на видео</h2>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Введите причину жалобы"
            className="w-full p-2 border border-gray-300 rounded-md mb-4 outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
            >
              Отмена
            </button>
            <button
              onClick={handleReport}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Отправить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReportButton;
