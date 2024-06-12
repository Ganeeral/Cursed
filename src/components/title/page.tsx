import React from "react";

interface Video {
    title: string;
}
const Title: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <h6 className="video__title text-base leading-5 font-bold overflow-ellipsis line-clamp-2">
      {video.title}
    </h6>
  );
};

export default Title;
