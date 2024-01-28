import React, { useState } from "react";
import ReplyList from "./ReplyList";
import CommentForm from "../../../forms/CommentForm";
const Comment = ({ comment, postId }) => {
  const [isReplying, setReplying] = useState(false);
  const handleReply = () => {
    setReplying((prev) => !prev);
  };
  return (
    <div>
      <div>{comment?.content}</div>
      <div>
        <button type="button" onClick={handleReply}>
          Reply
        </button>
        {isReplying && <CommentForm commentId={comment.id} postId={postId} />}
      </div>
      <div>
        <ReplyList commentId={comment.id} postId={postId} />
      </div>
    </div>
  );
};

export default Comment;
