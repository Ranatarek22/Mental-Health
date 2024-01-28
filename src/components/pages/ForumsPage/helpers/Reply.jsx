import React, { useState } from "react";
import CommentForm from "../../../forms/CommentForm";
import ReplyList from "./ReplyList";

const Reply = ({ postId, reply }) => {
  const [isReplying, setReplying] = useState(false);
  const [isLoadedReplies, setLoadedReplies] = useState(false);

  const handleReply = () => {
    setReplying((prev) => !prev);
  };
  return (
    <div>
      <div>
        <div>
          <button type="button" onClick={handleReply}>
            Reply
          </button>
          <button type="button" onClick={() => setLoadedReplies(true)}>
            show replies
          </button>
        </div>
        {isReplying && <CommentForm commentId={reply.id} postId={postId} />}
      </div>
      {isLoadedReplies && (
        <div>
          <ReplyList commentId={reply.id} postId={postId} />
        </div>
      )}
    </div>
  );
};

export default Reply;
