import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiInstance } from "../../../axios";
import toast from "react-hot-toast";
import axios from "axios";
import { TfiCommentsSmiley } from "react-icons/tfi";
import CommentSection from "../ForumsPage/helpers/CommentSection";

const ForumItemPage = () => {
  const params = useParams();
  const [forum, setForum] = useState();
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
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

        // Fetch comments and update the comments state
        const commentPromise = await apiInstance.get(
          `/posts/${postId}/comments`,
          {
            cancelToken: cancelToken.token,
          }
        );

        if (commentPromise.status === 200) {
          setComments(commentPromise.data);
          setCommentsCount(commentPromise.data.length);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("cancelled");
        } else {
          if (typeof error === "object") {
            toast.error(Object.values(error.response.data)[0]);
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
  }, [params.postId]);

  const postData = forum?.postedOn;
  // console.log(postData);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const calculateDuration = () => {
      const postDate = new Date(postData);
      const currentDate = new Date();
      const offset = currentDate.getTimezoneOffset();
      const local = new Date(currentDate.getTime() + offset * 60000);
      console.log(postDate);
      console.log(local);
      const timeDifference = local - postDate;
      console.log(timeDifference);
      const timeDate = new Date(timeDifference);
      console.log(timeDate);
      const seconds = Math.floor(timeDifference / 1000);
      //  2024-01-31T19:49:58.1940569
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

    calculateDuration();
  }, [postData]);
  return (
    <div>
      <div className="cont p-3 m-3">
        <div>
          <img src="/Avatars.png" className="p-2" />
        </div>
        <div className="py-2">
          <span style={{ fontWeight: "bold" }}>{forum?.username} </span>
          <br />
          <p className="text-muted">{duration}</p>
          <div>
            <h2 style={{ fontWeight: "bold" }} className="py-2">
              {forum?.title}
            </h2>
          </div>
          <div className="py-3 ">
            {forum?.content}
            <div className="py-2 mt-2">
              {" "}
              <TfiCommentsSmiley style={{ fontSize: "2rem" }} />
              <span className="ms-2 fw-bold">{commentsCount}</span>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default ForumItemPage;
