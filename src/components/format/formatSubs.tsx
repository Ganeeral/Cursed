import React from "react";

interface Video {
  subscribers: number;
}

interface User {
  subscribers: number;
}

interface Subscription {
  subscribers: any;
}

const formatSubscribers = (subscribers: number): string => {
  if (isNaN(subscribers) || subscribers === undefined) {
    return "";
  }

  if (subscribers >= 1000000) {
    return `${(subscribers / 1000000).toFixed(1)} млн подписчиков`;
  } else if (subscribers >= 1000) {
    return `${(subscribers / 1000).toFixed(0)} тыс. подписчиков`;
  } else {
    return `${subscribers} подписчиков`;
  }
};

interface ChannelInfoProps {
  video?: Video | null; 
  user?: User | null;
  subscription?: Subscription | null;
}

const FormatSubs: React.FC<ChannelInfoProps> = ({ video, user, subscription }) => {
  const subscribers = video?.subscribers ?? user?.subscribers ?? subscription?.subscribers;
  const formattedSubscribers = subscribers !== undefined ? formatSubscribers(subscribers) : "Нет подписчиков";

  return <>{formattedSubscribers}</>;
};

export default FormatSubs;
