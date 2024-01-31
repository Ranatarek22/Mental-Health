import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiInstance } from "../../../../axios";
import Comment from "./Comment";
import toast from "react-hot-toast";
import CommentForm from "../../../forms/CommentForm";
const CommentSection = ({ postId }) => {
  const [commentsData, setCommentsData] = useState([]);

  const fetchPostComments = async (postId) => {
    const cancelToken = axios.CancelToken.source();
    try {
      const commentsPromise = await apiInstance.get(
        `/posts/${postId}/comments`,
        {
          cancelToken: cancelToken.token,
        }
      );

      if (commentsPromise.status !== 200) {
        if (commentsPromise.response.data) {
          throw new Error(Object.values(commentsPromise.response.data)[0]);
        } else {
          throw new Error(commentsPromise.statusText);
        }
      }

      return await commentsPromise.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("cancelled");
      } else {
        if (
          typeof error === "object" &&
          error.response &&
          error.response.data
        ) {
          toast.error(Object.values(error.response.data)[0]);
        } else {
          toast.error("Something went wrong!");
        }
      }
    }

    return () => {
      cancelToken.cancel("Request canceled");
    };
  };

  useEffect(() => {
    // Fetch comments data from your API
    if (postId) {
      fetchPostComments(postId).then((data) => setCommentsData(data || []));
    }
  }, [postId]);

  const onAddComment = (comment) => {
    setCommentsData([...commentsData, comment]);
  };
  const onDeleteComment = async (commentId) => {
    try {
      await apiInstance.delete(`/posts/${postId}/comments/${commentId}`);
      setCommentsData((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      toast.success("Comment deleted");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
      }
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "end",
      }}
    >
      <div className="d-flex w-100 p-2">
        <div className="">
          <img src="/Avatars.png" className="h-100 w-100" />
        </div>
        <div className="flex-grow-1">
          <CommentForm postId={postId} onAddComment={onAddComment} />
        </div>
      </div>
      {/* Display the list of comments */}
      <div>
        {commentsData?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            postId={postId}
            onDeleteComment={onDeleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
