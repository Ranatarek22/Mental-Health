import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiInstance } from "../../../../axios";
import Comment from "./Comment";
import toast from "react-hot-toast";
import CommentForm from "../../../forms/CommentForm";
import { usePostStore } from "../../../../hooks/use-post-store";
import { useAuthStore } from "../../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";
const CommentSection = ({ postId }) => {
  const commentRefs = useRef({});
  const [commentsData, setCommentsData] = useState([]);
  const intialActivePost = usePostStore((state) => state.intialActivePost);
  const addPostComment = usePostStore((state) => state.addPostComment);
  const deletePostComment = usePostStore((state) => state.deletePostComment);
  const token = useAuthStore((state) => state.token);
  const updatePostComment = usePostStore((state) => state.updatePostComment);
  const updatePostReply = usePostStore((state) => state.updatePostReply);
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
      fetchPostComments(postId).then((data) => {
        setCommentsData(data || []);
        intialActivePost({ postId: postId, comments: data || [] });
      });
    }
  }, [postId]);

  const onAddComment = (comment) => {
    setCommentsData([...commentsData, comment]);
    addPostComment(comment);
  };
  const onDeleteComment = async (commentId) => {
    // console.log(apiInstance);
    try {
      const promise = await apiInstance.delete(
        `/posts/${postId}/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCommentsData((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      // console.log(promise);
      deletePostComment(commentId);
      toast.success("Comment deleted");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
      }
      toast.error("Failed to delete comment");
      // console.log(commentId);
    }
  };
  const onUpdateComment = async (data) => {
    setCommentsData((prevComments) => {
      const pastComments = prevComments.filter(
        (comment) => comment.id !== data.id
      );
      console.log(pastComments);
      console.log(data.id);
      return [...pastComments, data];
    });

    updatePostComment(data);
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
          <img
            alt="user Img"
            src={JSON.parse(localStorage.getItem("mental_auth")).photoUrl}
            className="userImage"
          />
        </div>
        <div className="flex-grow-1">
          <CommentForm
            postId={postId}
            onAddComment={onAddComment}
            // onUpdateComment={onUpdateComment}
          />
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
            onUpdateComment={onUpdateComment}
            ref={(el) => (commentRefs.current[comment.id] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
