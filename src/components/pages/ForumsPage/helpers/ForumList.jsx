import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiInstance } from "../../../../axios";

function ForumList() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get(
        `/posts?PageNumber=${page}&PageSize=${pageSize}`
      );
      const newPosts = response.data;

    
      if (page === 1) {
        setPosts(newPosts);
      } else {
        
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
      console.log(newPosts);
    
      setPage((prevPage) => prevPage + 1);

      setHasMore(newPosts.length === pageSize);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  console.log(posts);
  return (
    <div>
      <div className="cont4 p-2 m-3">
        <input type="text" className="p-2 m-2" placeholder="Search for forum" />
        <button className="p-2 m-2">Create Forum</button>
      </div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more posts</p>}
      >
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <div className="cont p-2 m-3 align-items-center">
                <div className="flex-grow-1">
                  <div className="cont p-2 m-2">
                    <div className="fw-bold flex-grow-1">{post.title}</div>
                    <div className="flex-column">
                      <span>like</span>
                    </div>
                  </div>
                  <div className="cont m-2">
                    <div>
                      <img src="/Avatars.png" className="pe-2" alt="avatar" />
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-bold m-0">{post.username}</span>
                      <br />
                      <p className="text-muted">Date: {post.postedOn}</p>
                    </div>
                    <div>
                      <span className="pt-2 mt-3">
                        Comments: {post.commentsCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default ForumList;
