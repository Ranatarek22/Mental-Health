import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiInstance } from "../../../axios";
import toast from "react-hot-toast";
import axios from "axios";
import { TfiCommentsSmiley } from "react-icons/tfi";
import CommentSection from "../ForumsPage/helpers/CommentSection";
import { usePostStore } from "../../../hooks/use-post-store";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { calculateDuration } from "../ForumsPage/Date";
import Tips from "../ForumsPage/helpers/Tips";
import NavUser from "../../navigation/NavUser/NavUser";

const ForumItemPage = () => {
  const userId = useAuthStore((state) => state.userId);
  const params = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState();
  const commentsCount = usePostStore((state) => state.totalComments);
  const token = useAuthStore((state) => state.token);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [photoPost, setPhotoPost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editButtonVisible, setEditButtonVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!forum && params.postId) {
      const fetchPostData = async (postId) => {
        const cancelToken = axios.CancelToken.source();
        try {
          const postPromise = await apiInstance.get(`/posts/${postId}`, {
            cancelToken: cancelToken.token,
          });
          if (postPromise.status !== 200) {
            throw new Error(postPromise.statusText);
          }
          const postData = postPromise.data;
          setForum(postData);
          setEditedTitle(postData.title);
          setEditedContent(postData.content);
          setIsAnonymous(postData.isAnonymous);
          setPhotoPost(postData.postPhotoUrl);
        } catch (error) {
          if (axios.isCancel(error)) {
            console.error("Cancelled");
          } else {
            toast.error(error.response?.data?.message || error.message);
          }
        }
        return () => cancelToken.cancel("Cancelled");
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

  // const handleUpdate = async () => {
  //   try {
  //     if (!editedTitle.trim() || !editedContent.trim()) {
  //       toast.error("Title and content cannot be empty");
  //       return;
  //     }
  //     console.log(editedContent);
  //     console.log(editedTitle);
  //     console.log(params.postId);
  //     console.log(isAnonymous);
  //     console.log(photoPost);
  //     const response = await apiInstance.put(`/posts/${params.postId}`, {
  //       Title: editedTitle,
  //       Content: editedContent,
  //       IsAnonymous: isAnonymous,
  //       PhotoPost: photoPost || "",
  //     });

  //     setForum(response.data);
  //     setIsEditing(false);
  //     toast.success("Post updated successfully");
  //     setEditButtonVisible(true);
  //   } catch (error) {
  //     console.error("Error updating post:", error);
  //     toast.error("Failed to update post");
  //   }
  // };
  const handleUpdate = async () => {
    try {
      if (!editedTitle.trim() || !editedContent.trim()) {
        toast.error("Title and content cannot be empty");
        return;
      }

      const response = await apiInstance.put(`/posts/${params.postId}`, {
        Title: editedTitle,
        Content: editedContent,
        IsAnonymous: isAnonymous,
        PhotoPost: photoPost || " ",
      });

      setForum(response.data);
      setIsEditing(false);
      toast.success("Post updated successfully");
      setEditButtonVisible(true);
    } catch (error) {
      console.error("Error updating post:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        toast.error(error.response.data?.message || "Failed to update post");
      } else if (error.request) {
        console.error("Request data:", error.request);
        toast.error("No response received from server");
      } else {
        console.error("Error message:", error.message);
        toast.error("Error setting up request");
      }
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
        navigate("/forums/forumlist");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPost(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <NavUser />
      <div className="p-2">
        <div style={{ display: "flex", width: "100%" }}>
          {forum ? (
            <div
              className="flex-direction-column"
              style={{ width: "100%", flex: "3" }}
            >
              <div className="cont p-3 mt-3 w-100">
                <div>
                  <img
                    src={forum.username ? forum.photoUrl : "/Anony.png"}
                    alt="user img"
                    className="userImage"
                  />
                </div>
                <div className="py-2" style={{ flexGrow: "1", width: "100%" }}>
                  <span style={{ fontWeight: "bold" }}>
                    {forum.username ? forum.username : "Anonymous"}
                  </span>
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
                      <h2 style={{ fontWeight: "bold" }} className="py-2">
                        {forum.title}
                      </h2>
                    )}
                  </div>
                  <div className="py-3">
                    {isEditing ? (
                      <>
                        <textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="form-control"
                        />
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="form-control mt-2"
                        />
                        <div className="form-check mt-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                          />
                          <label className="form-check-label">
                            Post as Anonymous
                          </label>
                        </div>
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
                      forum.content
                    )}
                    {forum.postPhotoUrl && (
                      <div className="postImg">
                        <img alt="post img" src={forum.postPhotoUrl} />
                      </div>
                    )}
                    <div className="py-2 mt-2">
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
                    className="fw-bold"
                    style={{ flexGrow: "1", direction: "rtl" }}
                  >
                    <button
                      className="btn btn-link text-muted"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
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
                        <button
                          className="dropdown-item"
                          onClick={onDeleteClick}
                        >
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
                <div className="d-flex flex-row">
                  <div className="flex-column flex-grow-1">
                    <CommentSection postId={params.postId} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="cont3 pt-3">
              <p className="fw-bold">Post has been deleted.</p>
            </div>
          )}
          <div
            style={{ width: "50%", flex: "2" }}
            className="mt-4 tips justify-content-center w-100"
          >
            <Tips />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumItemPage;
