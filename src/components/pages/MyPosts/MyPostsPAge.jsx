import React from "react";
import Sidebar from "../../navigation/SideBar/sidebar";

import Tips from "../ForumsPage/helpers/Tips";
import { Container, Row, Col } from "react-bootstrap";
import NavUser from "../../navigation/NavUser/NavUser";
import MyPosts from "./MyPosts";
import ArticlesFeed from "../ArticlesFeed/ArticlesFeed";

function MyPostsPAge() {
  const recentArticles = (
    <div className="tips-content p-2">
      <h3>Recent Posts</h3>
      <ul>
        <li>How to move on from your failure !! </li>
        <li>Drowning in my thoughts ..</li>
        <li>I L O S T Myself </li>
      </ul>
    </div>
  );
  return (
    <>
      <NavUser />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <MyPosts />
        </div>
        <div className="d-flex flex-column">
          {/* <div className="mt-4  w-100 tips">
            <Tips content={recentArticles} />
          </div> */}
          <div>
            <ArticlesFeed />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPostsPAge;
