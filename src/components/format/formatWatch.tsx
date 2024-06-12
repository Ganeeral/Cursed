import React from "react";

interface Video {
    views: number;
}

const formatWatch = (views: number): string => {
  if (isNaN(views) || views === undefined) {
    return "";
  }

  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)} млн просмотров`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(0)} тыс. просмотров`;
  } else {
    return `${views} просмотров`;
  }
};

interface ChannelInfoProps {
  video: Video;
}

const FormatWatch: React.FC<ChannelInfoProps> = ({ video }) => {
  const formattedSubscribers = formatWatch(video.views);

  return (
    <>
      {formattedSubscribers}
    </>
  );
};

export default FormatWatch;
