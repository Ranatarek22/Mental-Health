import React, { useEffect, useState } from "react";
import CommentList from "../ForumsPage/helpers/CommentList";
import { useParams } from "react-router-dom";
import { apiInstance } from "../../../axios";
import toast from "react-hot-toast";
import axios from "axios";
import CommentForm from "../../forms/CommentForm";
const ForumItemPage = () => {
  const params = useParams();
  const [forum, setForum] = useState();
  const fetchPostData = async (postId) => {
    const cancelToken = axios.CancelToken.source();
    try {
      const postPromise = await apiInstance.get(`/posts/${postId}`, {
        cancelToken: cancelToken.token,
      });

      // console.log(tokenPromise)
      if (postPromise.status !== 200) {
        if (postPromise.response.data) {
          throw new Error(Object.values(postPromise.response.data)[0]);
        } else {
          throw new Error(postPromise.statusText);
        }
      }
      // navigate("/forumdetails");
      // window.location.reload();
      return await postPromise.data;
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
    fetchPostData(params.postId).then((data) => setForum(data));
  }, [params.postId]);

  return (
    <div>
      <div>
        <h1>{forum?.title}</h1>
      </div>
      <div>
        <CommentForm postId={params.postId} />
      </div>
      <div>
        <CommentList postId={params.postId} />
      </div>
    </div>
  );
};

export default ForumItemPage;
