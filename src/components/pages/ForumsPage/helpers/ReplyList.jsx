import React, { useEffect, useState } from "react";
import { apiInstance } from "../../../../axios";
import toast from "react-hot-toast";
import axios from "axios";
import Reply from "./Reply";
const ReplyList = ({ postId, commentId }) => {
  const [replies, setReplies] = useState([]);
  const fetchCommentReplies = async (postId, commentId) => {
    const cancelToken = axios.CancelToken.source();
    try {
      const repliesPromise = await apiInstance.get(
        `/posts/${postId}/comments/${commentId}/replies`,
        {
          cancelToken: cancelToken.token,
        }
      );

      // console.log(tokenPromise)
      if (repliesPromise.status !== 200) {
        if (repliesPromise.response.data) {
          throw new Error(Object.values(repliesPromise.response.data)[0]);
        } else {
          throw new Error(repliesPromise.statusText);
        }
      }
      // navigate("/forumdetails");
      // window.location.reload();
    //   console.log(repliesPromise.data);
      return await repliesPromise.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("cancelled");
      } else {
        // console.error("Error details:", error);
        if (typeof error === "object") {
          toast.error(Object.values(error.response.data));
        } else {
          toast.error(String(error));
        }
      }
    }

    return () => {
      cancelToken.cancel("cancelled");
    };
  };

  useEffect(() => {
    fetchCommentReplies(postId, commentId).then((data) => setReplies(data));
  }, [postId, commentId]);

  return (
    <div>
      {replies.map((reply) => (
        <Reply
          reply={reply}
          commentId={commentId}
          postId={postId}
          key={reply.id}
        />
      ))}
    </div>
  );
};

export default ReplyList;
