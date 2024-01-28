import React, { useEffect, useState } from "react";
import { apiInstance } from "../../../../axios";
import toast from "react-hot-toast";
import axios from "axios";
import Comment from "./Comment";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const fetchPostComments = async (postId) => {
    const cancelToken = axios.CancelToken.source();
    try {
      const commentPromise = await apiInstance.get(
        `/posts/${postId}/comments`,
        {
          cancelToken: cancelToken.token,
        }
      );

      // console.log(tokenPromise)
      if (commentPromise.status !== 200) {
        if (commentPromise.response.data) {
          throw new Error(Object.values(commentPromise.response.data)[0]);
        } else {
          throw new Error(commentPromise.statusText);
        }
      }
      // navigate("/forumdetails");
      // window.location.reload();
      console.log(commentPromise.data);
      return await commentPromise.data;
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
    fetchPostComments(postId).then((data) => setComments(data));
  }, [postId]);

  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} postId={postId} key={comment.id} />
      ))}
    </div>
  );
};

export default CommentList;
