"use client";

import React, { useEffect } from "react";
import {
  SquadsIcon,
  GoogleIcon,
  LoftIcon,
  MiroIcon,
  CardioIcon,
  SaisonIcon,
} from "@/ui/icons";

const data = [
  {
    Id: 1,
    Icon: SquadsIcon,
  },
  {
    Id: 2,
    Icon: GoogleIcon,
  },
  {
    Id: 3,
    Icon: LoftIcon,
  },
  {
    Id: 4,
    Icon: MiroIcon,
  },
  {
    Id: 5,
    Icon: SaisonIcon,
  },
];

const SnapSliider = () => {
  useEffect(() => {
    const container = document.getElementById("scrollContainer");

    const handleScroll = () => {
      const elements = container?.getElementsByClassName(
        "snap-center"
      ) as HTMLCollectionOf<HTMLElement>;

      for (let element of elements) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.left >= 0 && rect.right <= window.innerWidth;

        if (isVisible) {
          element.classList.add("element-visible");
          element.classList.remove("element-hidden");
        } else {
          element.classList.remove("element-visible");
          element.classList.add("element-hidden");
        }
      }
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative snap">
      <div
        className="flex gap-x-8 px-6 snap-container min-w-[auto] scrollbar-hide"
        id="scrollContainer"
      >
        {data.map((item) => (
          <div key={item.Id} className="h-full snap-center">
            <item.Icon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnapSliider;
