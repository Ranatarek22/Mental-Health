import React from "react";
import Sidebar from "../../navigation/SideBar/sidebar";
import ForumList from "./helpers/ForumList";
import Tips from "./helpers/Tips";
import { Container, Row, Col } from "react-bootstrap";
import NavUser from "../../navigation/NavUser/NavUser";

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
        }}
      >
        <div style={{ flex: "3" }}>
          <ForumList />
        </div>
        <div style={{ flex: " 2 2 0" }} className="mt-4  w-100 tips">
          <Tips content={recentArticles} />
        </div>
      </div>
    </>
  );
};

export default ForumPage;
