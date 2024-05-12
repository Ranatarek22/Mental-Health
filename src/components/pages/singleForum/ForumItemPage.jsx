import React, { useEffect, useState } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { apiInstance } from "../../../axios";
import toast from "react-hot-toast";
import axios from "axios";
import { TfiCommentsSmiley } from "react-icons/tfi";
import CommentSection from "../ForumsPage/helpers/CommentSection";
import { usePostStore } from "../../../hooks/use-post-store";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { calculateDuration } from "../ForumsPage/Date";
// import { useNavigate } from "react-router-dom";

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
          console.log(postPromise.data);
          if (postPromise.status !== 200) {
            if (postPromise.response.data) {
              throw new Error(Object.values(postPromise.response.data)[0]);
            } else {
              throw new Error(postPromise.statusText);
            }
          }
          const postData = await postPromise.data;
          console.log(postData);

          setForum(postData);
          setEditedTitle(postData.title);
          setEditedContent(postData.content);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.error("cancelled");
          } else {
            if (typeof error === "object") {
              toast.error(Object.values(error.response.data)[0]);
              // console.log(error);
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
  }, [forum, params.postId, userId]);

  const postData = forum?.postedOn;
  const isMyPost = forum?.appUserId === userId;

  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (postData) {
      const intervalId = setInterval(() => {
        const calculatedDuration = calculateDuration(postData);
        setDuration(calculatedDuration);
      }, 3000);

      return () => clearInterval(intervalId);
    }
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
      {forum ? (
        <>
          <div className="cont p-3 mt-3">
            <div>
              <img
                src={forum.username ? "/Avatars.png" : "/Anony.png"}
                className="p-2"
              />
              {/* {console.log(forum.username)} */}
            </div>
            <div
              className="py-2"
              style={{
                flexGrow: "1",
                width: "100%",
              }}
            >
              <span style={{ fontWeight: "bold" }}>
                {forum.username ? forum.username : "Anonymous"}
              </span>
              {/* {console.log(forum.username)} */}

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
                    {forum.title}
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
                  forum.content
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
          <div className="cont2 flex-column p-3 mt-3">
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
      ) : (
        <>
          {/* <div className="cont3 pt-3 ">
            <p className="fw-bold ">Post has been deleted.</p>
          </div> */}
        </>
      )}
    </div>
  );
};

export default ForumItemPage;
