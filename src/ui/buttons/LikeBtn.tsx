import React, { useEffect, useState } from "react";
import { LikeWhiteIcon, DislikeIcon } from "../icons";

interface LikeDislikeProps {
  videoId: number;
  userId: number;
}

const LikeDislike: React.FC<LikeDislikeProps> = ({ videoId, userId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null
  );

  useEffect(() => {
    fetch(`http://Flixx/src/api/getVideoLikes.php?video_id=${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
      })
      .catch((error) => console.error("Error fetching video likes:", error));

    fetch(`http://Flixx/src/api/getUserReaction.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, video_id: videoId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserReaction(data.reaction);
      })
      .catch((error) => console.error("Error fetching user reaction:", error));
  }, [videoId, userId]);

  const handleReaction = (type: "like" | "dislike") => {
    fetch(`http://Flixx/src/api/likeVideo.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, video_id: videoId, type }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error sending reaction:", error));
  };

  return (
    <button className="flex items-center gradientBtn rounded-lg  max-h-[40px]">
      <div
        onClick={() => handleReaction("like")}
        className={`likeHover duration bg-inherit pl-[14px] pr-[8px] py-[11.5px] flex items-center justify-center gap-x-3 ${
          userReaction === "like" ? "likeHovered" : ""
        }`}
      >
        <LikeWhiteIcon />
        <span className="text-white text-xs">{likes}</span>
      </div>
      <div className="gradientStick h-[23px] w-[1px] rounded-sm" />
      <div
        onClick={() => handleReaction("dislike")}
        className={`disHover duration pr-[14px] pl-[8px] py-[11.5px] flex items-center justify-center ${
          userReaction === "dislike" ? "likeHovered" : ""
        }`}
      >
        <DislikeIcon />
      </div>
    </button>
  );
};

export default LikeDislike;
