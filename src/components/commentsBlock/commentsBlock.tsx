import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Video } from "@/types/video";
import cn from "classnames";
import Link from "next/link";

interface ChannelInfoProps {
  video: Video | null;
}

interface Comment {
  comment: string;
  created_at: string;
  username: string;
  author_avatar: string;
  user_id: string;
}

const CommentsBlock: React.FC<ChannelInfoProps> = ({ video }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const userId = localStorage.getItem("user_id") || "";

  useEffect(() => {
    if (video) {
      fetch(`http://flixx/src/api/getComments.php?video_id=${video.id}`)
        .then(response => response.json())
        .then((data: Comment[]) => setComments(data));
    }
  }, [video]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim() || !video) return;

    const response = await fetch('http://flixx/src/api/addComment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        video_id: video.id.toString(),
        user_id: userId,
        comment: newComment,
      }),
    });

    const result = await response.json();
    if (result.status === "success") {
      setNewComment("");
      setIsInputFocused(false);
      fetch(`http://flixx/src/api/getComments.php?video_id=${video.id}`)
        .then(response => response.json())
        .then((data: Comment[]) => setComments(data));
    }
  };

  if (!video) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-2 pb-5">
      <form method="POST" onSubmit={handleSubmit}>
        <h5 className="leading-5 text-white tracking-[-0.03em]">
          {comments.length} комментария
        </h5>
        <div className="flex gap-x-3 items-center mt-5">
          <div className="h-10 w-10 rounded-full relative">
            <Image
              src={video.author_avatar}
              alt=""
              fill
              className="rounded-full object-center object-cover min-w-10"
            />
          </div>
          <div className="relative w-full">
            <input
              className="outline-none text-sideText w-full bg-inherit"
              type="text"
              placeholder="Введите комментарий"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <div className={cn("input-nofocus")}></div>
            <div
              className={cn("input-line", {
                "input-focused": isInputFocused,
              })}
            ></div>
          </div>
        </div>
        <div
          className={cn("w-full flex justify-end", {
            "opacity-100 block": isInputFocused,
            "opacity-0 hidden": !isInputFocused,
            "transition-opacity duration-300": true,
          })}
        >
          <button
            type="submit"
            className="gradientBtn text-white px-4 py-2 rounded-lg"
          >
            Отправить
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-y-5">
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-x-3 items-center">
            <div className="h-10 w-10 rounded-full relative">
              <Link href={`/channel/${comment.user_id}`}>
                <Image
                  src={comment.author_avatar}
                  alt=""
                  fill
                  className="rounded-full object-center object-cover min-w-10"
                />
              </Link>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-x-1 items-center">
                <p className="text-titleText text-xs">@{comment.username}</p>
                <p className="text-sideText text-[10px]">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>

              <p className="text-xs text-sideText">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsBlock;
