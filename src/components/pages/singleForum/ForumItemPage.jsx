import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { apiInstance } from "../../../axios";
import toast from "react-hot-toast";
import axios from "axios";
import { TfiCommentsSmiley } from "react-icons/tfi";
import CommentSection from "../ForumsPage/helpers/CommentSection";
import { usePostStore } from "../../../hooks/use-post-store";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { useNavigate } from "react-router-dom";

const ForumItemPage = () => {
  const userId = useAuthStore((state) => state.userId);
  const params = useParams();
  const [forum, setForum] = useState();
  const commentsCount = usePostStore((state) => state.totalComments);
  const token = useAuthStore((state) => state.token);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editButtonVisible, setEditButtonVisible] = useState(true);

  useEffect(() => {
    if (!forum && params.postId) {
      const fetchPostData = async (postId) => {
        const cancelToken = axios.CancelToken.source();
        try {
          const postPromise = await apiInstance.get(`/posts/${postId}`, {
            cancelToken: cancelToken.token,
          });

          if (postPromise.status !== 200) {
            if (postPromise.response.data) {
              throw new Error(Object.values(postPromise.response.data)[0]);
            } else {
              throw new Error(postPromise.statusText);
            }
          }
          const postData = await postPromise.data;

          setForum(postData);
          setEditedTitle(postData.title);
          setEditedContent(postData.content);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.error("cancelled");
          } else {
            if (typeof error === "object") {
              toast.error(Object.values(error.response.data)[0]);
              console.log(error);
            } else {
              toast.error(String(error));
            }
          }
        }

        return () => {
          cancelToken.cancel("cancelled");
        };
      };
      fetchPostData(params.postId);
    }
  }, [forum, params.postId]);

  const postData = forum?.postedOn;
  const isMyPost = forum?.appUserId == userId;

  const [duration, setDuration] = useState("");

  useEffect(() => {
    const calculateDuration = () => {
      const postDate = new Date(postData);
      const currentDate = new Date();
      const offset = currentDate.getTimezoneOffset();
      const local = new Date(currentDate.getTime() + offset * 60000);

      const timeDifference = local - postDate;

      const seconds = Math.floor(timeDifference / 1000);
      const minute = 60;
      const hour = minute * 60;
      const day = hour * 24;
      const month = day * 30;
      const year = month * 12;

      let durationString = "";

      if (seconds < minute) {
        if (seconds < 10) {
          durationString = `just now`;
        } else {
          durationString = `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
        }
      } else if (seconds < hour) {
        const minutes = Math.floor(seconds / minute);
        durationString = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      } else if (seconds < day) {
        const hours = Math.floor(seconds / hour);
        durationString = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      } else if (seconds < month) {
        const days = Math.floor(seconds / day);
        durationString = `${days} day${days !== 1 ? "s" : ""} ago`;
      } else if (seconds < year) {
        const months = Math.floor(seconds / month);
        durationString = `${months} month${months !== 1 ? "s" : ""} ago`;
      } else {
        const formattedDate = postDate.toLocaleDateString();
        const formattedTime = postDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        durationString = `on ${formattedDate} at ${formattedTime}`;
      }

      setDuration(durationString);
    };

    const intervalId = setInterval(() => calculateDuration(), 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [postData]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const Dropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditButtonVisible(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(forum.title);
    setEditedContent(forum.content);
    setIsEditing(false);
    setEditButtonVisible(true);
  };

  const handleUpdate = async () => {
    try {
      if (!editedTitle.trim() || !editedContent.trim()) {
        toast.error("Title and content cannot be empty");
        return;
      }

      const response = await apiInstance.put(`/posts/${params.postId}`, {
        title: editedTitle,
        content: editedContent,
      });

      setForum(response.data);
      setIsEditing(false);
      toast.success("Post updated successfully");
      setEditButtonVisible(true);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await apiInstance.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        console.log("Forum post deleted successfully");
        setForum(null);
      } else {
        console.error("Failed to delete forum post");
      }
    } catch (error) {
      console.error("Error deleting forum post:", error);
    }
  };

  const onDeleteClick = () => {
    if (params?.postId) {
      handleDelete(params.postId);
    }
  };
  return (
    <div>
      {forum === null ? (
        <div className="centered-container">
          <div className="cont3 pt-3 ">
            <p className="fw-bold ">Post has been deleted.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="cont p-3 m-3">
            <div>
              <img src="/Avatars.png" className="p-2" />
            </div>
            <div
              className="py-2"
              style={{
                flexGrow: "1",
                width: "100%",
              }}
            >
              {forum && forum.username && (
                <span style={{ fontWeight: "bold" }}>{forum.username} </span>
              )}
              <br />
              <p className="text-muted">{duration}</p>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="form-control mb-2"
                  />
                ) : (
                  // Display post title
                  <h2 style={{ fontWeight: "bold" }} className="py-2">
                    {forum?.title}
                  </h2>
                )}
              </div>
              <div className="py-3 ">
                {isEditing ? (
                  <>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="form-control"
                    />
                    <div className="d-flex">
                      <button
                        className="btn text-muted me-2"
                        style={{ textDecoration: "none" }}
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        className="btn text-muted"
                        style={{ textDecoration: "none" }}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  // Display post content
                  forum?.content
                )}

                <div className="py-2 mt-2">
                  {" "}
                  <TfiCommentsSmiley
                    style={{
                      fontSize: "2rem",
                      flexGrow: "1",
                      direction: "rtl",
                    }}
                  />
                  <span className="ms-2 fw-bold">{commentsCount}</span>
                </div>
              </div>
            </div>
            {editButtonVisible && isMyPost && (
              <div
                className="fw-bold "
                style={{ flexGrow: "1", direction: "rtl" }}
              >
                <button
                  className="btn btn-link text-muted"
                  onClick={Dropdown}
                  aria-expanded={dropdownOpen ? "true" : "false"}
                  style={{ textDecoration: "none" }}
                >
                  <span className="fw-bold">...</span>
                </button>
                {dropdownOpen && (
                  <div
                    className="dropdown-menu"
                    style={{ display: "block", height: "11%", width: "6%" }}
                  >
                    <button className="dropdown-item" onClick={handleEdit}>
                      Edit
                    </button>
                    <button className="dropdown-item" onClick={onDeleteClick}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="cont2 flex-column p-3 m-3">
            <div className="flex-row">
              <p className="fw-bold p-2">Comments ({commentsCount})</p>
            </div>
            <div className=" d-flex flex-row">
              <div className="flex-column flex-grow-1">
                <CommentSection postId={params.postId} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ForumItemPage;
