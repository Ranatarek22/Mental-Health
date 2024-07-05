import React from "react";
import Sidebar from "../../navigation/SideBar/sidebar";
import ForumList from "./helpers/ForumList";
import Tips from "./helpers/Tips";
import { Container, Row, Col } from "react-bootstrap";
import NavUser from "../../navigation/NavUser/NavUser";
import ArticlesFeed from "../ArticlesFeed/ArticlesFeed";

const ForumPage = () => {
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
          height: "100vh", // Make sure the parent container has a height defined
        }}
      >
        <div style={{ overflowY: "auto" }}>
          <ForumList />
        </div>
        <div className="d-flex flex-column">
          {/* <div className="mt-4 w-100 tips">
            <Tips content={recentArticles} />
          </div> */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            <ArticlesFeed />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumPage;
