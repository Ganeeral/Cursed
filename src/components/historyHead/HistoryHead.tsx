import { TrashHistoryIcon } from "@/ui/icons";
import React from "react";
import cn from "classnames";

const HistoryHead: React.FC<{ clearHistory: () => void }> = ({ clearHistory }) => {
  return (
    <div
      className={cn(
        "flex justify-start flex-col gap-y-5 items-start mt-4",
        "flix:justify-between flix:flex-row flix:items-center flix:gap-y-0 flix:mt-10"
      )}
    >
      <h1 className="textGradient text-4xl font-bold">История просмотров</h1>
      <button
        onClick={clearHistory}
        className={cn(
          "flex gap-x-2 items-center bg-searchText p-3 rounded-md hover:bg-hoveredCard duration-300"
        )}
      >
        <TrashHistoryIcon />
        <span className="text-lg text-sideText">Очистить историю</span>
      </button>
    </div>
  );
};

export default HistoryHead;
