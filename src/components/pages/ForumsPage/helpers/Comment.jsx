import React, { useEffect, useState } from "react";
import CommentForm from "../../../forms/CommentForm";
import { apiInstance } from "../../../../axios";
import axios from "axios";
import toast from "react-hot-toast";

const Comment = (props) => {
  const { comment, postId, isReply } = props;
  const [showForm, setShowForm] = useState(false);
  const [replies, setReplies] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //api call

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
    if (postId && comment) {
      fetchCommentReplies(postId, comment.id).then((data) =>
        setReplies(data || [])
      );
    }
  }, [postId, comment?.id]);

  const onAddCommentReply = (reply) => {
    setShowForm(false);
    setReplies([...replies, reply]);
  };

  return (
    <div>
      <div
        className="d-flex gap-2 p-2 align-items-start justify-content-start"
        style={{ width: "200px" }}
      >
        <div>
          <img src="/Avatars.png" />
        </div>
        <div>
          <h6 className="fw-bold m-0">{comment?.username}</h6>
          <p className="fw-normal">{comment?.content}</p>
          {isReply && ( // Render the Reply button only for root comments
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
        </div>
      </div>
      {replies && (
        <div style={{ marginLeft: "23%" }}>
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              postId={postId}
              isReply={false}
              // onAddComment={onAddCommentReply}
            />
          ))}
        </div>
      )}
      {showForm && isReply && (
        <CommentForm
          postId={postId}
          commentId={comment.id}
          onAddComment={onAddCommentReply}
          style={{ marginLeft: "23%" }}
        />
      )}
    </div>
  );
};

export default Comment;
