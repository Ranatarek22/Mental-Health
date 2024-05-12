import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiInstance } from "../../../../axios";
import { useNavigate } from "react-router-dom";
// import { usePostStore } from "../../../../hooks/use-post-store";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";
import { calculateDuration } from "../Date";

function ForumList() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const navigate = useNavigate();
  // const commentsCount = usePostStore((state) => state.totalComments);

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get(
        `/posts?PageNumber=${page}&PageSize=${pageSize}`
      );
      const newPosts = response.data;
      //comment this sensitive data it show user id
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
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="w-100">
      <div
        className="d-flex flex-column"
        style={{ backgroundColor: "#9cd8e7" }}
      >
        <div
          className="cont4 p-2 m-3 "
          style={{ position: "sticky", top: 0, zIndex: "10" }}
        >
          <input
            type="text"
            className="p-2 m-2"
            placeholder="Search for forum"
          />
          <button className="p-2 m-2" onClick={() => navigate(`/createforum`)}>
            Create Forum
          </button>
        </div>

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
                <div className="cont p-2 m-3 align-items-center">
                  <div className="flex-grow-1">
                    <div className="cont p-2 m-2">
                      <div className="fw-bold flex-grow-1">{post.title}</div>
                      {/* <div className="flex-column">
                      <span>like</span>
                    </div> */}
                    </div>
                    <div className="cont m-2">
                      <div>
                        <img
                          src={post.username ? "/Avatars.png" : "/Anony.png"}
                          className="pe-2"
                          alt="avatar"
                        />
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-bold m-0">
                          {" "}
                          {post.username ? post.username : "Anonymous"}
                        </span>
                        <br />
                        <p className="text-muted"> {postDate}</p>
                      </div>
                      <div>
                        {/* <span className="pt-2 mt-3">
                          Comments
                          {commentsCount}
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default ForumList;
