import React from "react";
import Sidebar from "../../navigation/SideBar/sidebar";
import ForumList from "./helpers/ForumList";
import Tips from "./helpers/Tips";
import { Container, Row, Col } from "react-bootstrap";
import NavUser from "../../navigation/NavUser/NavUser";
import CreateForumForm from "../../forms/CreateForumForm";

const CreateForumPage = () => {
    const guidelines = (
      <div className="tips-content p-2">
        <h3>Guidelines</h3>
        <ul>
          <li>Don't insult or curse anyone </li>
          <li>Be free to express your feelings but be polite </li>
          <li>If your post is rude or insult anyone it will be rejected </li>
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
          <CreateForumForm />
        </div>
        <div style={{ flex: " 2 2 0" }} className="mt-4  w-100 tips">
          <Tips content={guidelines} />
        </div>
      </div>
    </>
  );
};

export default CreateForumPage;
