"use client"

import React, { useEffect, useState } from "react";
import { Kolok } from "../icons";

interface SubscribeButtonProps {
  subscriberId: number;
  channelId: number;
  isOwner: boolean;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  subscriberId,
  channelId,
  isOwner,
}) => {
  const [subscribed, setSubscribed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSubscription = async () => {
      const subscriberId = localStorage.getItem("user_id");
      const response = await fetch(
        "http://flixx/src/api/check_subscription.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriber_id: subscriberId,
            channel_id: channelId,
          }),
        }
      );
      const data = await response.json();
      setSubscribed(data.subscribed);
    };

    if (!isOwner) {
      checkSubscription();
    }
  }, [subscriberId, channelId, isOwner]);

  const handleSubscribe = async () => {
    const subscriberId = localStorage.getItem("user_id");
    const response = await fetch("http://flixx/src/api/subscribe.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriber_id: subscriberId,
        channel_id: channelId,
      }),
    });
    const data = await response.json();
    if (data.message === "Subscribed successfully") {
      setSubscribed(true);
    }
  };

  const handleUnsubscribe = async () => {
    const subscriberId = localStorage.getItem("user_id");
    const response = await fetch("http://flixx/src/api/unsubscribe.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriber_id: subscriberId,
        channel_id: channelId,
      }),
    });
    const data = await response.json();
    if (data.message === "Unsubscribed successfully") {
      setSubscribed(false);
    }
  };

  if (isOwner || subscriberId === channelId) {
    return null;
  }

  return (
    <button
      onClick={subscribed ? handleUnsubscribe : handleSubscribe}
      className="author__sub cursor-pointer justify-center flex gap-x-[15px] py-[13px] px-[20px] flix:px-[35px] rounded-[20px] outline-none"
    >
      <Kolok />
      <div className="hidden flix:block">
        <p className="text-xs text-white">
          {subscribed ? "Отписаться" : "Подписаться"}
        </p>
      </div>
    </button>
  );
};

export default SubscribeButton;
