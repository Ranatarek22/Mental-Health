import React, { forwardRef, useEffect, useState } from "react";
import CommentForm from "../../../forms/CommentForm";
import { apiInstance } from "../../../../axios";
import axios from "axios";
import toast from "react-hot-toast";
import { usePostStore } from "../../../../hooks/use-post-store";
import { useAuthStore } from "../../../../hooks/use-auth-store";
import useForceRerender from "../../../../hooks/useForceRerender";

const Comment = forwardRef((props, ref) => {
  const {
    comment,
    postId,
    isReply,
    onDeleteComment,
    parentId,
    onUpdateComment,
  } = props;
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const updatePostReply = usePostStore((state) => state.updatePostReply);
  const updatePostComment = usePostStore((state) => state.updatePostComment);
  const forceRerender = useForceRerender();

  const intialActiveReplies = usePostStore(
    (state) => state.intialActiveReplies
  );
  const addPostReply = usePostStore((state) => state.addPostReply);
  const userId = useAuthStore((state) => state.userId);
  const deletePostReply = usePostStore((state) => state.deletePostReply);
  const token = useAuthStore((state) => state.token);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleEditForm = () => {
    setShowEditForm((prev) => !prev);
  };
  //api call
  const onDeleteClick = () => {
    if (parentId) {
      onDeleteComment(parentId, comment.id);
    } else {
      onDeleteComment(comment.id);
    }
  };

  const fetchCommentReplies = async (postId, commentId) => {
    const cancelToken = axios.CancelToken.source();
    try {
      const repliesPromise = await apiInstance.get(
        `/posts/${postId}/comments/${commentId}/replies`,
        {
          cancelToken: cancelToken.token,
        }
      );

      if (repliesPromise.status !== 200) {
        if (repliesPromise.response.data) {
          throw new Error(Object.values(repliesPromise.response.data)[0]);
        } else {
          throw new Error(repliesPromise.statusText);
        }
      }

      return await repliesPromise.data;
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
    // Fetch replies data from your API
    if (postId && comment && !isReply) {
      fetchCommentReplies(postId, comment.id).then((data) => {
        setReplies(data || []);
        intialActiveReplies(data || []);
      });
    }
  }, [postId, comment?.id, isReply]);

  const onAddCommentReply = (reply) => {
    setShowForm(false);
    setReplies([...replies, reply]);
    addPostReply(reply);
  };
  const onUpdateCommentReply = (reply) => {
    const filteredReplies = replies.filter((temp) => temp.id !== reply.id);
    console.log(filteredReplies);
    console.log(reply.id);
    setReplies([...filteredReplies, reply]);
    // setReplies((prevReplies) => [
    //   ...prevReplies.filter((temp) => temp.id !== reply.id),
    //   reply,
    // ]);

    // updatePostReply(reply);
  };

  const UpdateComment = (reply) => {
    setShowEditForm(false);

    if (onUpdateComment) {
      onUpdateComment(reply);
    }
  };
  useEffect(() => {
    forceRerender();
  }, [replies]);
  const onDeleteReply = async (commentId, replyId) => {
    // console.log(apiInstance);
    try {
      const promise = await apiInstance.delete(
        `/posts/${postId}/comments/${commentId}/replies/${replyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReplies((prevReplies) =>
        prevReplies.filter((reply) => reply.id !== replyId)
      );
      // console.log(promise);
      deletePostReply(replyId);
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
  const isMyComment = comment.appUserId === userId;

  // console.log(comment.appUserId);
  // console.log(comment);
  return (
    <div>
      <div
        ref={ref}
        id={comment.id}
        className="d-flex gap-2 p-2 align-items-start justify-content-start"
      >
        <div>
          <img
            alt="comment user Img"
            src={comment.photoUrl}
            className="userImage"
          />
        </div>
        <div className="text-truncate">
          <h6 className="fw-bold m-0">{comment?.username}</h6>
          <p className="fw-normal text-break text-wrap">{comment?.content}</p>
          {!isReply && (
            <button
              className="text-muted"
              onClick={toggleForm}
              style={{
                border: "none",
                background: "none",
              }}
            >
              Reply
            </button>
          )}
          {isMyComment && (
            <button
              onClick={onDeleteClick}
              className="text-muted p-1"
              style={{
                border: "none",
                background: "none",
              }}
            >
              Delete
            </button>
          )}
          {isMyComment && (
            <button
              onClick={toggleEditForm}
              className="text-muted p-1"
              style={{
                border: "none",
                background: "none",
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div style={{ marginLeft: "8%" }}>
        {showForm && !showEditForm && (
          <CommentForm
            postId={postId}
            // commentId={comment.id}
            onAddComment={onAddCommentReply}
            parentId={comment.id}
            // onUpdateComment={onUpdateCommentReply}
            style={{ marginLeft: "23%" }}
          />
        )}
        {!showForm && showEditForm && comment && (
          <CommentForm
            postId={postId}
            commentId={comment.id}
            // onAddComment={onAddCommentReply}
            onUpdateComment={UpdateComment}
            intialData={comment}
            parentId={parentId}
            style={{ marginLeft: "23%" }}
          />
        )}
      </div>
      {replies && (
        <div style={{ marginLeft: "8%" }}>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              postId={postId}
              isReply
              parentId={comment.id}
              onDeleteComment={onDeleteReply}
              onUpdateComment={onUpdateCommentReply}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default Comment;
