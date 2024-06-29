import React from "react";
import Sidebar from "../../navigation/SideBar/sidebar";
import ForumList from "./helpers/ForumList";
import Tips from "./helpers/Tips";
import { Container, Row, Col } from "react-bootstrap";
import NavUser from "../../navigation/NavUser/NavUser";
import CreateForumForm from "../../forms/CreateForumForm";

const CreateForumPage = () => {
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
          <Tips />
        </div>
      </div>
    </>
  );
};

export default CreateForumPage;
