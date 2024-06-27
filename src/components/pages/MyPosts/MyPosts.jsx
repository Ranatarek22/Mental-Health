import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";
import { useAuthStore } from "../../../hooks/use-auth-store";
import { calculateDuration } from "../ForumsPage/Date";
import { apiInstance } from "../../../axios";
import Tips from "../ForumsPage/helpers/Tips";

export default function MyPosts() {
  const userId = useAuthStore((state) => state.userId);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get(
        `/posts/user/${userId}?PageNumber=${page}&PageSize=${pageSize}`
      );
      const newPosts = response.data;
      // console.log(newPosts);

      setPosts((prevPosts) => [...prevPosts, ...newPosts]);

      setPage((prevPage) => prevPage + 1);

      setHasMore(newPosts.length === pageSize);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    console.log(posts);
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div className="w-100">
      <div style={{ display: "flex", width: "100%" }}>
        <div className="feed" style={{ width: "50%", flex: "3" }}>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={<SyncLoader color={"#36D7B7"} css={override} size={15} />}
            style={{ overflow: "hidden" }}
            endMessage={<p>No more posts</p>}
          >
            {posts.map((post, index) => {
              const postDate = calculateDuration(post.postedOn);
              return (
                <div
                  key={index}
                  className="post-container"
                  onClick={() => navigate(`/forums/${post.id}`)}
                >
                  <div className="cont p-2 m-3 align-items-center mypost">
                    <div className="contmypost p-2">
                      <div>
                        <img
                          width={40}
                          height={40}
                          src={!post.isAnonymous ? post.photoUrl : "/Anony.png"}
                          className="userImage"
                          alt="avatar"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-bold m-0">
                          {!post.isAnonymous ? post.username : "Anonymous"}
                        </span>
                        <br />
                        <p className="text-muted"> {postDate}</p>
                      </div>
                    </div>
                    <div className="contmypost p-2 m-2 d-flex justify-content-center align-items-center">
                      <div className="fw-bold flex-grow-1">{post.title}</div>
                    </div>
                    <div className="contmypost d-flex justify-content-center align-items-center p-2 m-2">
                      <div className=" flex-grow-1">{post.content}</div>
                    </div>
                    <div className="postImg">
                      {post.postPhotoUrl && (
                        <img src={post.postPhotoUrl} alt="postPhotoUrl" />
                      )}
                    </div>
                    <div className="comments">
                      {post.commentsCount} Comments
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
        <div
          style={{ width: "50%", flex: "2" }}
          className="mt-4 tips justify-content-center w-100"
        >
          <Tips />
        </div>
      </div>
    </div>
  );
}
