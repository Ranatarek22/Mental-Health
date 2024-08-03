import React, { useState, useEffect } from "react";
import Sidebar from "../../navigation/SideBar/sidebar";
import ForumList from "./helpers/ForumList";
import Tips from "./helpers/Tips";
import { Container, Row, Col } from "react-bootstrap";
import NavUser from "../../navigation/NavUser/NavUser";
import ArticlesFeed from "../ArticlesFeed/ArticlesFeed";

const ForumPage = () => {
  const [isForumListLoaded, setForumListLoaded] = useState(false);

  const recentArticles = (
    <div className="tips-content p-2">
      <h3>Recent Posts</h3>
      <ul>
        <li>How to move on from your failure !!</li>
        <li>Drowning in my thoughts ..</li>
        <li>I L O S T Myself</li>
      </ul>
    </div>
  );

  useEffect(() => {
 
    setTimeout(() => {
      setForumListLoaded(true);
    }, 1000); 
  }, []);

  return (
    <>
      <NavUser />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
        }}
      >
        <div style={{ overflowY: "auto", flex: isForumListLoaded ? 2 : 1 }}>
          {isForumListLoaded ? <ForumList /> : <div>Loading Forum List...</div>}
        </div>
        <div className="d-flex flex-column" style={{ flex: 1 }}>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <ArticlesFeed />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumPage;
