// import React, { useState, useEffect, useCallback } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { apiInstance } from "../../../../axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { css } from "@emotion/react";
// import { SyncLoader } from "react-spinners";
// import { calculateDuration } from "../Date";
// import { Slider } from "@mui/material";
// import debounce from "lodash.debounce";
// import Select from "react-select";
// import { FaFilter } from "react-icons/fa";
// function ForumList() {
//   const [posts, setPosts] = useState([]);
//   // const [likedPosts, setLikedPosts] = useState({});
//   const [hasMore, setHasMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const pageSize = 30;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showFilters, setShowFilters] = useState(false);
//   const getFiltersFromURL = () => {
//     const searchParams = new URLSearchParams(location.search);
//     return {
//       Title: searchParams.get("Title") || "",
//       Content: searchParams.get("Content") || "",
//       Username: searchParams.get("Username") || "",
//       StartTime: searchParams.get("StartTime") || null,
//       EndTime: searchParams.get("EndTime") || null,
//       ConfessionsOnly: searchParams.get("ConfessionsOnly") === "true",
//     };
//   };
//   const [filters, setFilters] = useState(getFiltersFromURL);

//   const fetchPosts = useCallback(async () => {
//     console.log("test");
//     // console.log("test");
//     try {
//       const response = await apiInstance.get(`/posts`, {
//         params: { PageNumber: page, PageSize: pageSize, ...filters },
//       });
//       const newPosts = response.data;
//       console.log(newPosts);
//       if (page === 1) {
//         setPosts(newPosts);
//       } else {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       }
//       setHasMore(newPosts.length === pageSize);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   }, [filters, page]);
//   const debouncedFetchPosts = useCallback(
//     debounce(() => {
//       fetchPosts();
//     }, 1000),
//     [fetchPosts]
//   );
//   useEffect(() => {
//     debouncedFetchPosts();
//     return debouncedFetchPosts.cancel;
//   }, [filters, debouncedFetchPosts]);
//   useEffect(() => {
//     setPage(1);
//   }, [filters]);
//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
//   `;

//   useEffect(() => {
//     const searchParams = new URLSearchParams();
//     if (filters.Title) searchParams.set("Title", filters.Title);
//     if (filters.Content) searchParams.set("Content", filters.Content);
//     if (filters.Username) searchParams.set("Username", filters.Username);
//     if (filters.StartTime) searchParams.set("StartTime", filters.StartTime);
//     if (filters.EndTime) searchParams.set("EndTime", filters.EndTime);
//     if (filters.ConfessionsOnly)
//       searchParams.set("ConfessionsOnly", filters.ConfessionsOnly.toString());
//     navigate(`${location.pathname}?${searchParams.toString()}`, {
//       replace: true,
//     });
//   }, [filters, navigate, location.pathname]);
//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };
//   const resetFilters = () => {
//     setFilters({
//       Title: "",
//       Content: "",
//       Username: "",
//       StartTime: "",
//       EndTime: "",
//       ConfessionsOnly: false,
//     });
//   };

//   return (
//     <div className="w-100">
//       <button
//         className="filter-toggle"
//         onClick={() => setShowFilters(!showFilters)}
//       >
//         <FaFilter /> Filter
//       </button>
//       <button
//         className="filter-toggle"
//         onClick={() => setShowFilters(!showFilters)}
//       >
//         <FaFilter /> Filter
//       </button>
//       <div className={`filters ${showFilters ? "show" : ""}`}>
//         <h3>Filter</h3>
//         <label htmlFor="Title">Title :</label>
//         <input
//           id="Title"
//           type="text"
//           name="Title"
//           placeholder="Title"
//           value={filters.Title}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="Content">Content :</label>
//         <input
//           id="Content"
//           type="text"
//           name="Content"
//           placeholder="Content"
//           value={filters.Content}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="Username">Username :</label>
//         <input
//           id="Username"
//           type="text"
//           name="Username"
//           placeholder="Username"
//           value={filters.Username}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="StartTime">Start Time :</label>
//         <input
//           id="StartTime"
//           type="datetime-local"
//           name="StartTime"
//           value={filters.StartTime}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="EndTime">End Time :</label>
//         <input
//           id="EndTime"
//           type="datetime-local"
//           name="EndTime"
//           value={filters.EndTime}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="ConfessionsOnly">Confessions Only :</label>
//         <input
//           id="ConfessionsOnly"
//           type="checkbox"
//           name="ConfessionsOnly"
//           checked={filters.ConfessionsOnly}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.checked)}
//         />
//         <button className="reset-button" onClick={resetFilters}>
//           Reset Filters
//         </button>
//       </div>
//       <div style={{ display: "flex", width: "100%" }}>
//         <div className="feed" style={{ width: "50%", flex: "3" }}>
//           <InfiniteScroll
//             dataLength={posts.length}
//             next={() => setPage((prevPage) => prevPage + 1)}
//             hasMore={hasMore}
//             loader={
//               <SyncLoader
//                 color={"var(--main-color)"}
//                 css={override}
//                 size={15}
//               />
//             }
//             style={{ overflow: "hidden" }}
//             endMessage={<p>No more posts</p>}
//           >
//             {posts.map((post, index) => {
//               const postDate = calculateDuration(post.postedOn);
//               return (
//                 <div
//                   key={index}
//                   className="post-container"
//                   onClick={() => navigate(`/forums/${post.id}`)}
//                 >
//                   <div className="cont p-2 m-3 align-items-center mypost">
//                     <div className="contmypost p-2">
//                       <div>
//                         <img
//                           width={40}
//                           height={40}
//                           src={!post.isAnonymous ? post.photoUrl : "/Anony.png"}
//                           className="userImage"
//                           alt="avatar"
//                         />
//                       </div>
//                       <div className="flex-grow-1">
//                         <span className="fw-bold m-0">
//                           {!post.isAnonymous ? post.username : "Anonymous"}
//                         </span>
//                         <br />
//                         <p className="text-muted"> {postDate}</p>
//                       </div>
//                     </div>
//                     <div className="contmypost p-2 m-2 d-flex justify-content-center align-items-center">
//                       <div className="fw-bold flex-grow-1">{post.title}</div>
//                     </div>
//                     <div className="contmypost d-flex justify-content-center align-items-center p-2 m-2">
//                       <div className=" flex-grow-1">{post.content}</div>
//                     </div>
//                     <div className="postImg">
//                       {post.postPhotoUrl && (
//                         <img src={post.postPhotoUrl} alt="postPhotoUrl" />
//                       )}
//                     </div>
//                     <div className="comments">
//                       {post.commentsCount} Comments
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </InfiniteScroll>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ForumList;

// import React, { useState, useEffect, useCallback } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { apiInstance } from "../../../../axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { css } from "@emotion/react";
// import { SyncLoader } from "react-spinners";
// import { calculateDuration } from "../Date";
// import { Slider } from "@mui/material";
// import debounce from "lodash.debounce";
// import Select from "react-select";
// import { FaFilter } from "react-icons/fa";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// function ForumList() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const pageSize = 30;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showFilters, setShowFilters] = useState(false);

//   const getFiltersFromURL = () => {
//     const searchParams = new URLSearchParams(location.search);
//     return {
//       Title: searchParams.get("Title") || "",
//       Content: searchParams.get("Content") || "",
//       Username: searchParams.get("Username") || "",
//       StartTime: searchParams.get("StartTime") || null,
//       EndTime: searchParams.get("EndTime") || null,
//       ConfessionsOnly: searchParams.get("ConfessionsOnly") === "true",
//     };
//   };

//   const [filters, setFilters] = useState(getFiltersFromURL);

//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await apiInstance.get(`/posts`, {
//         params: { PageNumber: page, PageSize: pageSize, ...filters },
//       });
//       const newPosts = response.data;
//       if (page === 1) {
//         setPosts(newPosts);
//       } else {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       }
//       setHasMore(newPosts.length === pageSize);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters, page]);

//   const debouncedFetchPosts = useCallback(
//     debounce(() => {
//       fetchPosts();
//     }, 1000),
//     [fetchPosts]
//   );

//   useEffect(() => {
//     debouncedFetchPosts();
//     return debouncedFetchPosts.cancel;
//   }, [filters, debouncedFetchPosts]);

//   useEffect(() => {
//     setPage(1);
//   }, [filters]);

//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
//   `;

//   useEffect(() => {
//     const searchParams = new URLSearchParams();
//     if (filters.Title) searchParams.set("Title", filters.Title);
//     if (filters.Content) searchParams.set("Content", filters.Content);
//     if (filters.Username) searchParams.set("Username", filters.Username);
//     if (filters.StartTime) searchParams.set("StartTime", filters.StartTime);
//     if (filters.EndTime) searchParams.set("EndTime", filters.EndTime);
//     if (filters.ConfessionsOnly)
//       searchParams.set("ConfessionsOnly", filters.ConfessionsOnly.toString());
//     navigate(`${location.pathname}?${searchParams.toString()}`, {
//       replace: true,
//     });
//   }, [filters, navigate, location.pathname]);

//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       Title: "",
//       Content: "",
//       Username: "",
//       StartTime: "",
//       EndTime: "",
//       ConfessionsOnly: false,
//     });
//   };

//   const renderSkeleton = () => {
//     return Array(pageSize)
//       .fill()
//       .map((_, index) => (
//         <div key={index} className="post-container">
//           <div className="cont p-2 m-3 align-items-center mypost">
//             <div className="contmypost p-2">
//               <Skeleton circle={true} height={40} width={40} />
//               <div className="flex-grow-1" style={{ marginLeft: "10px" }}>
//                 <Skeleton width={100} />
//                 <Skeleton width={150} />
//               </div>
//             </div>
//             <div className="contmypost p-2 m-2 d-flex justify-content-center align-items-center">
//               <Skeleton width={200} />
//             </div>
//             <div className="contmypost d-flex justify-content-center align-items-center p-2 m-2">
//               <Skeleton width={"90%"} height={50} />
//             </div>
//             <div className="postImg">
//               <Skeleton height={200} />
//             </div>
//             <div className="comments">
//               <Skeleton width={100} />
//             </div>
//           </div>
//         </div>
//       ));
//   };

//   return (
//     <div className="w-100">
//       <button
//         className="filter-toggle"
//         onClick={() => setShowFilters(!showFilters)}
//       >
//         <FaFilter /> Filter
//       </button>
//       <div className={`filters ${showFilters ? "show" : ""}`}>
//         <h3>Filter</h3>
//         <label htmlFor="Title">Title :</label>
//         <input
//           id="Title"
//           type="text"
//           name="Title"
//           placeholder="Title"
//           value={filters.Title}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="Content">Content :</label>
//         <input
//           id="Content"
//           type="text"
//           name="Content"
//           placeholder="Content"
//           value={filters.Content}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="Username">Username :</label>
//         <input
//           id="Username"
//           type="text"
//           name="Username"
//           placeholder="Username"
//           value={filters.Username}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="StartTime">Start Time :</label>
//         <input
//           id="StartTime"
//           type="datetime-local"
//           name="StartTime"
//           value={filters.StartTime}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="EndTime">End Time :</label>
//         <input
//           id="EndTime"
//           type="datetime-local"
//           name="EndTime"
//           value={filters.EndTime}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="ConfessionsOnly">Confessions Only :</label>
//         <input
//           id="ConfessionsOnly"
//           type="checkbox"
//           name="ConfessionsOnly"
//           checked={filters.ConfessionsOnly}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.checked)}
//         />
//         <button className="reset-button" onClick={resetFilters}>
//           Reset Filters
//         </button>
//       </div>
//       <div style={{ display: "flex", width: "100%" }}>
//         <div className="feed" style={{ width: "50%", flex: "3" }}>
//           <InfiniteScroll
//             dataLength={posts.length}
//             next={() => setPage((prevPage) => prevPage + 1)}
//             hasMore={hasMore}
//             loader={
//               <SyncLoader
//                 color={"var(--main-color)"}
//                 css={override}
//                 size={15}
//               />
//             }
//             style={{ overflow: "hidden" }}
//             endMessage={<p>No more posts</p>}
//           >
//             {loading
//               ? renderSkeleton()
//               : posts.map((post, index) => {
//                   const postDate = calculateDuration(post.postedOn);
//                   return (
//                     <div
//                       key={index}
//                       className="post-container"
//                       onClick={() => navigate(`/forums/${post.id}`)}
//                     >
//                       <div className="cont p-2 m-3 align-items-center mypost">
//                         <div className="contmypost p-2">
//                           <div>
//                             <img
//                               width={40}
//                               height={40}
//                               src={
//                                 !post.isAnonymous ? post.photoUrl : "/Anony.png"
//                               }
//                               className="userImage"
//                               alt="avatar"
//                             />
//                           </div>
//                           <div className="flex-grow-1">
//                             <span className="fw-bold m-0">
//                               {!post.isAnonymous ? post.username : "Anonymous"}
//                             </span>
//                             <br />
//                             <p className="text-muted"> {postDate}</p>
//                           </div>
//                         </div>
//                         <div className="contmypost p-2 m-2 d-flex justify-content-center align-items-center">
//                           <div className="fw-bold flex-grow-1">
//                             {post.title}
//                           </div>
//                         </div>
//                         <div className="contmypost d-flex justify-content-center align-items-center p-2 m-2">
//                           <div className=" flex-grow-1">{post.content}</div>
//                         </div>
//                         <div className="postImg">
//                           {post.postPhotoUrl && (
//                             <img src={post.postPhotoUrl} alt="postPhotoUrl" />
//                           )}
//                         </div>
//                         <div className="comments">
//                           {post.commentsCount} Comments
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//           </InfiniteScroll>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ForumList;

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { apiInstance } from "../../../../axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { css } from "@emotion/react";
// import { SyncLoader } from "react-spinners";
// import { calculateDuration } from "../Date";
// import debounce from "lodash.debounce";
// import { FaFilter } from "react-icons/fa";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// function ForumList() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const pageSize = 30;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showFilters, setShowFilters] = useState(false);

//   const getFiltersFromURL = () => {
//     const searchParams = new URLSearchParams(location.search);
//     return {
//       Title: searchParams.get("Title") || "",
//       Content: searchParams.get("Content") || "",
//       Username: searchParams.get("Username") || "",
//       StartTime: searchParams.get("StartTime") || null,
//       EndTime: searchParams.get("EndTime") || null,
//       ConfessionsOnly: searchParams.get("ConfessionsOnly") === "true",
//     };
//   };

//   const [filters, setFilters] = useState(getFiltersFromURL);

//   const fetchPosts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await apiInstance.get("/posts", {
//         params: { PageNumber: page, PageSize: pageSize, ...filters },
//       });
//       const newPosts = response.data;
//       if (page === 1) {
//         setPosts(newPosts);
//       } else {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//       }
//       setHasMore(newPosts.length === pageSize);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters, page]);

//   const debouncedFetchPosts = useCallback(
//     debounce(() => {
//       fetchPosts();
//     }, 1000),
//     [fetchPosts]
//   );

//   useEffect(() => {
//     debouncedFetchPosts();
//     return debouncedFetchPosts.cancel;
//   }, [filters, debouncedFetchPosts]);

//   useEffect(() => {
//     setPage(1);
//   }, [filters]);

//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
//   `;

//   useEffect(() => {
//     const searchParams = new URLSearchParams();
//     if (filters.Title) searchParams.set("Title", filters.Title);
//     if (filters.Content) searchParams.set("Content", filters.Content);
//     if (filters.Username) searchParams.set("Username", filters.Username);
//     if (filters.StartTime) searchParams.set("StartTime", filters.StartTime);
//     if (filters.EndTime) searchParams.set("EndTime", filters.EndTime);
//     if (filters.ConfessionsOnly)
//       searchParams.set("ConfessionsOnly", filters.ConfessionsOnly.toString());
//     navigate(`${location.pathname}?${searchParams.toString()}`, {
//       replace: true,
//     });
//   }, [filters, navigate, location.pathname]);

//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       Title: "",
//       Content: "",
//       Username: "",
//       StartTime: "",
//       EndTime: "",
//       ConfessionsOnly: false,
//     });
//   };

//   const renderSkeleton = () => {
//     return Array(pageSize)
//       .fill()
//       .map((_, index) => (
//         <div key={index} className="post-container">
//           <div className="cont p-2 m-3 align-items-center mypost">
//             <div className="contmypost p-2">
//               <Skeleton circle={true} height={40} width={40} />
//               <div className="flex-grow-1" style={{ marginLeft: "10px" }}>
//                 <Skeleton width={100} />
//                 <Skeleton width={150} />
//               </div>
//             </div>
//             <div className="contmypost p-2 m-2 d-flex justify-content-center align-items-center">
//               <Skeleton width={200} />
//             </div>
//             <div className="contmypost d-flex justify-content-center align-items-center p-2 m-2">
//               <Skeleton width={"90%"} height={50} />
//             </div>
//             <div className="postImg">
//               <Skeleton height={200} />
//             </div>
//             <div className="comments">
//               <Skeleton width={100} />
//             </div>
//           </div>
//         </div>
//       ));
//   };

//   return (
//     <div className="w-100">
//       <button
//         className="filter-toggle"
//         onClick={() => setShowFilters(!showFilters)}
//       >
//         <FaFilter /> Filter
//       </button>
//       <div className={`filters ${showFilters ? "show" : ""}`}>
//         <h3>Filter</h3>
//         <label htmlFor="Title">Title :</label>
//         <input
//           id="Title"
//           type="text"
//           name="Title"
//           placeholder="Title"
//           value={filters.Title}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="Content">Content :</label>
//         <input
//           id="Content"
//           type="text"
//           name="Content"
//           placeholder="Content"
//           value={filters.Content}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="Username">Username :</label>
//         <input
//           id="Username"
//           type="text"
//           name="Username"
//           placeholder="Username"
//           value={filters.Username}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="StartTime">Start Time :</label>
//         <input
//           id="StartTime"
//           type="datetime-local"
//           name="StartTime"
//           value={filters.StartTime}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="EndTime">End Time :</label>
//         <input
//           id="EndTime"
//           type="datetime-local"
//           name="EndTime"
//           value={filters.EndTime}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
//         />
//         <label htmlFor="ConfessionsOnly">Confessions Only :</label>
//         <input
//           id="ConfessionsOnly"
//           type="checkbox"
//           name="ConfessionsOnly"
//           checked={filters.ConfessionsOnly}
//           onChange={(e) => handleFilterChange(e.target.name, e.target.checked)}
//         />
//         <button className="reset-button" onClick={resetFilters}>
//           Reset Filters
//         </button>
//       </div>
//       <div style={{ display: "flex", width: "100%" }}>
//         <div className="feed" style={{ width: "50%", flex: "3" }}>
//           <InfiniteScroll
//             dataLength={posts.length}
//             next={() => setPage((prevPage) => prevPage + 1)}
//             hasMore={hasMore}
//             loader={
//               <SyncLoader
//                 color={"var(--main-color)"}
//                 css={override}
//                 size={15}
//               />
//             }
//             style={{ overflow: "hidden" }}
//             endMessage={<p>No more posts</p>}
//           >
//             <AnimatePresence>
//               {posts.map((post, index) => (
//                 <AnimatedPost
//                   key={post.id}
//                   post={post}
//                   index={index}
//                   navigate={navigate}
//                 />
//               ))}
//             </AnimatePresence>
//             {loading && renderSkeleton()}
//           </InfiniteScroll>
//         </div>
//       </div>
//     </div>
//   );
// }

// const AnimatedPost = ({ post, index, navigate }) => {
//   const [ref, isIntersecting] = useInView({ threshold: 0.1 });

//   const variants = {
//     hidden: { scale: 0.9, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//     },
//     exit: { scale: 0.9, opacity: 0 },
//   };

//   return (
//     <motion.div
//       ref={ref}
//       variants={variants}
//       initial="hidden"
//       animate={isIntersecting ? "visible" : "exit"}
//       exit="exit"
//       className="post-container"
//       onClick={() => navigate(`/forums/${post.id}`)}
//     >
//       <div className="cont p-2 m-3 align-items-center mypost">
//         <div className="contmypost p-2">
//           <div>
//             <img
//               width={40}
//               height={40}
//               src={
//                 !post.isAnonymous
//                   ? post.profilePicture
//                   : "/path/to/default/image"
//               }
//               alt="Profile"
//               className="rounded-circle mr-3"
//             />
//           </div>
//           <div
//             className="d-flex flex-column flex-grow-1"
//             style={{ marginLeft: "10px" }}
//           >
//             <p className="mb-0 fw-bold">
//               {post.isAnonymous ? "Anonymous" : post.username}
//             </p>
//             <p className="post-time mb-0 text-black-50">
//               {calculateDuration(post.date)}
//             </p>
//           </div>
//         </div>
//         <div className="contmypost p-2 m-2 d-flex justify-content-center align-items-center">
//           <h2 className="m-0 post-title">{post.title}</h2>
//         </div>
//         <div className="contmypost d-flex justify-content-center align-items-center p-2 m-2">
//           <p
//             className="post-content m-0"
//             dangerouslySetInnerHTML={{ __html: post.content }}
//           ></p>
//         </div>
//         {post.filePath && (
//           <div className="postImg">
//             <img src={post.filePath} alt="Post" />
//           </div>
//         )}
//         <div className="comments">
//           <p>Comments: {post.commentCount}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ForumList;

import React, { useState, useEffect, useCallback, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiInstance } from "../../../../axios";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";
import { calculateDuration } from "../Date";
import debounce from "lodash.debounce";
import { FaFilter } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

function ForumList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    try {
      const response = await apiInstance.get("/posts", {
        params: { PageNumber: page, PageSize: pageSize, ...filters },
      });
      const newPosts = response.data;
      if (page === 1) {
        setPosts(newPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
      setHasMore(newPosts.length === pageSize);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
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
    return debouncedFetchPosts.cancel;
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

  const renderSkeleton = () => {
    return Array(pageSize)
      .fill()
      .map((_, index) => (
        <div key={index} className="post-container">
          <div className="cont p-2 m-3 align-items-center mypost">
            <div className="contmypost p-2">
              <Skeleton circle={true} height={40} width={40} />
              <div className="flex-grow-1" style={{ marginLeft: "10px" }}>
                <Skeleton width={100} />
                <Skeleton width={150} />
              </div>
            </div>
            <div className="contmypost p-2 m-2 d-flex justify-content-center align-items-center">
              <Skeleton width={200} />
            </div>
            <div className="contmypost d-flex justify-content-center align-items-center p-2 m-2">
              <Skeleton width={"90%"} height={50} />
            </div>
            <div className="postImg">
              <Skeleton height={200} />
            </div>
            <div className="comments">
              <Skeleton width={100} />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="w-100">
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
            <AnimatePresence>
              {posts.map((post, index) => (
                <AnimatedPost
                  key={post.id}
                  post={post}
                  index={index}
                  navigate={navigate}
                  // onClick={() => navigate(`/forums/${post.id}`)}
                />
              ))}
            </AnimatePresence>
            {loading && renderSkeleton()}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

const AnimatedPost = ({ post, index, navigate }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
    },
    exit: { scale: 0.9, opacity: 0 },
  };

  const postDate = calculateDuration(post.postedOn);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "exit"}
      exit="exit"
      className="post-container"
      onClick={() => navigate(`/forums/${post.id}`)}
    >
      <div className="cont p-2 m-3 align-items-center mypost">
        <div className="contmypost p-2">
          <img
            width={40}
            height={40}
            src={!post.isAnonymous ? post.photoUrl : "/Anony.png"}
            className="userImage"
            alt="avatar"
          />
          <div className="flex-grow-1" style={{ marginLeft: "10px" }}>
            <h5>{post.username}</h5>
            <p>{postDate}</p>
          </div>
        </div>
        <div className="contmypost p-2 m-2 d-flex justify-content-center align-items-center">
          <h2>{post.title}</h2>
        </div>
        <div className="contmypost d-flex justify-content-center align-items-center p-2 m-2">
          <p>{post.content}</p>
        </div>
        {post.postPhotoUrl && (
          <div className="postImg">
            <img src={post.postPhotoUrl} alt="Post Image" />
          </div>
        )}
        <div className="comments">
          <button onClick={() => navigate(`/posts/${post.id}`)}>
            {post.commentsCount} Comments
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ForumList;
