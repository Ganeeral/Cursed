import Image from "next/image";
import React from "react";
import FormatSubs from "../format/formatSubs";

interface SubCardProps {
  subscription: any;
}

const SubCard: React.FC<SubCardProps> = ({ subscription }) => {
  const user = {
    subscribers: subscription.subscribers,
  };
  return (
    <div className="bg-sideText rounded-xl min-w-[210px] tablet-s:min-w-0 tablet-s:max-w-[210px] w-full justify-center items-center py-4 flex flex-col gap-y-3">
      <div className="h-20 w-20 rounded-full flex justify-center items-center relative">
        <Image
          src={subscription.profile_picture}
          alt=""
          fill
          className="rounded-full object-center object-cover min-w-20"
        />
      </div>

      <div className="flex justify-center flex-col gap-x-4">
        <p className="text-base text-center text-white">
          {subscription.username}
        </p>
        <p className="text-xs text-center text-white">
          <FormatSubs user={user} />
        </p>
      </div>

      <button className="px-4 py-2 text-xs text-white bg-searchText rounded-md">
        Вы подписаны
      </button>
    </div>
  );
};

export default SubCard;
