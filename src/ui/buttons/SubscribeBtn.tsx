import React, { useEffect, useState } from "react";
import { Kolok } from "../icons";

interface SubscribeButtonProps {
  subscriberId: number;
  channelId: number;
  isOwner: boolean;
}

const SubscribeBtn: React.FC<SubscribeButtonProps> = ({
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
      className="rounded-lg cursor-pointer gradientBtn px-4 py-1 flex justify-center items-center gap-x-3"
    >
      <Kolok />
      <span className="hidden text-xs text-white leading-4 flix:block">
        {subscribed ? "Отписаться" : "Подписаться"}
      </span>
    </button>
  );
};

export default SubscribeBtn;
