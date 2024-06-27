import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiInstance } from "../../../../axios";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";
import { calculateDuration } from "../Date";

function ForumList() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get(
        `/posts?PageNumber=${page}&PageSize=${pageSize}`
      );
      const newPosts = response.data;
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

  const handleLikeClick = (postId) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !prevLikedPosts[postId],
    }));
  };

  const handleCommentClick = (e, postId) => {
    e.stopPropagation();
    navigate(`/forums/${postId}#comments`);
  };

  return (
    <div className="w-100">
      <div className="d-flex flex-column">
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
            const isLiked = likedPosts[post.id];

            return (
              <div
                key={index}
                className="post-container"
                onClick={() => navigate(`/forums/${post.id}`)}
              >
                <div className="cont p-2 m-3 align-items-center">
                  <div className="flex-grow-1">
                    <div className=" p-2 m-2">
                      <h3>{post.title}</h3>
                    </div>
                    <div className=" m-2 d-flex align-items-center">
                      <img
                        src={post.username ? post.photoUrl : "/Anony.png"}
                        className="userImage"
                        alt="avatar"
                      />
                      <div className="flex-grow-1">
                        <span className="fw-bold m-0">
                          {post.username ? post.username : "Anonymous"}
                        </span>
                        <br />
                        <p className="text-muted"> {postDate}</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      {post.postPhotoUrl && (
                        <img
                          width="80%"
                          alt="post photo"
                          src={post.postPhotoUrl}
                        />
                      )}
                    </div>
                    <div className="d-flex justify-content-start p-2 mt-3">
                      <div
                        className="icon-container"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLikeClick(post.id);
                        }}
                      >
                        <FaThumbsUp
                          className="icon"
                          style={{ color: isLiked ? "blue" : "black" }}
                        />
                      </div>
                      <div
                        className="icon-container"
                        onClick={(e) => handleCommentClick(e, post.id)}
                      >
                        <FaComment className="icon" />
                      </div>
                      <div
                        className="icon-container"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaShare className="icon" />
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
