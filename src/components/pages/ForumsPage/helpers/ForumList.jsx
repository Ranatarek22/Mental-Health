import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiInstance } from "../../../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";
import { calculateDuration } from "../Date";
import { Slider } from "@mui/material";
import debounce from "lodash.debounce";
import Select from "react-select";
import { FaFilter } from "react-icons/fa";
function ForumList() {
  const [posts, setPosts] = useState([]);
  // const [likedPosts, setLikedPosts] = useState({});
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 30;
  const navigate = useNavigate();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const getFiltersFromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      Title: searchParams.get("Title") || "",
      Content: searchParams.get("Content") || "",
      Username: searchParams.get("Username") || "",
      StartTime: searchParams.get("StartTime") || null,
      EndTime: searchParams.get("EndTime") || null,
      ConfessionsOnly: searchParams.get("ConfessionsOnly") === "true",
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL);

  const fetchPosts = useCallback(async () => {
    // console.log("test");
    try {
      const response = await apiInstance.get(`/posts`, {
        params: { PageNumber: page, PageSize: pageSize, ...filters },
      });
      const newPosts = response.data;
      console.log(newPosts);
      if (page === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }

      setHasMore(newPosts.length === pageSize);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [filters, page]);

  const debouncedFetchPosts = useCallback(
    debounce(() => {
      fetchPosts();
    }, 1000),
    [fetchPosts]
  );

  useEffect(() => {
    debouncedFetchPosts();
    return debouncedFetchPosts.cancel; // Cleanup on unmount or on filter change
  }, [filters, debouncedFetchPosts]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

 

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (filters.Title) searchParams.set("Title", filters.Title);
    if (filters.Content) searchParams.set("Content", filters.Content);
    if (filters.Username) searchParams.set("Username", filters.Username);
    if (filters.StartTime) searchParams.set("StartTime", filters.StartTime);
    if (filters.EndTime) searchParams.set("EndTime", filters.EndTime);
    if (filters.ConfessionsOnly)
      searchParams.set("ConfessionsOnly", filters.ConfessionsOnly.toString());

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [filters, navigate, location.pathname]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      Title: "",
      Content: "",
      Username: "",
      StartTime: "",
      EndTime: "",
      ConfessionsOnly: false,
    });
  };


  return (
    <div className="w-100">
      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter /> Filter
      </button>
      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter /> Filter
      </button>
      <div className={`filters ${showFilters ? "show" : ""}`}>
        <h3>Filter</h3>
        <label htmlFor="Title">Title :</label>
        <input
          id="Title"
          type="text"
          name="Title"
          placeholder="Title"
          value={filters.Title}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="Content">Content :</label>
        <input
          id="Content"
          type="text"
          name="Content"
          placeholder="Content"
          value={filters.Content}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="Username">Username :</label>
        <input
          id="Username"
          type="text"
          name="Username"
          placeholder="Username"
          value={filters.Username}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="StartTime">Start Time :</label>
        <input
          id="StartTime"
          type="datetime-local"
          name="StartTime"
          value={filters.StartTime}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="EndTime">End Time :</label>
        <input
          id="EndTime"
          type="datetime-local"
          name="EndTime"
          value={filters.EndTime}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="ConfessionsOnly">Confessions Only :</label>
        <input
          id="ConfessionsOnly"
          type="checkbox"
          name="ConfessionsOnly"
          checked={filters.ConfessionsOnly}
          onChange={(e) => handleFilterChange(e.target.name, e.target.checked)}
        />
        <button className="reset-button" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div className="feed" style={{ width: "50%", flex: "3" }}>
          <InfiniteScroll
            dataLength={posts.length}
            next={() => setPage((prevPage) => prevPage + 1)}
            hasMore={hasMore}
            loader={
              <SyncLoader
                color={"var(--main-color)"}
                css={override}
                size={15}
              />
            }
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
      </div>
    </div>
  );
}

export default ForumList;
