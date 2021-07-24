import React, {useState} from "react";
import {ReplyButton, Replies, ReplyBox} from "./ReplyComment";

// formating time
// we get time in milliseconds
// https://www.epochconverter.com/
import { formatRelative } from "date-fns";

const Comment = ({ comment }) => {
  const [toggleReplyBox, setToggleReplyBox] = useState(false);

  return (
    <div
      className="rounded-md border border-[#ccc] dark:bg-[#2f2f2f] dark:border-[#555]"
      data-aos="fade-left"
    >
      <div className="p-2 flex items-center hover:bg-white duration-200">
        <img
          src={
            comment.photoURL
              ? comment.photoURL
              : `https://unavatar.vercel.app/${comment.email}`
          }
          alt={comment.email}
          className="h-[50px] w-[50px] rounded-md pixelated white-light-shadow"
        />
        <div className="ml-2">
          <h2 className="font-semibold text-base text-[#222] dark:text-[#fafafa]">
            {comment.comment}
          </h2>
          <h4 className="text-xs font-semibold text-[#666] capitalize dark:text-[#aaa]">
            {formatRelative(comment.time, new Date())} •{" "}
            {comment.name && comment.name} •{" "}<ReplyButton toggleReplyBox={toggleReplyBox} setToggleReplyBox={setToggleReplyBox} />
          </h4>
        </div>
      </div>
      <Replies />
      <ReplyBox toggleReplyBox={toggleReplyBox} setToggleReplyBox={setToggleReplyBox} comment={comment}/>
    </div>
  );
};

export default Comment;
