import React from 'react'
import Sidebar from "../../navigation/SideBar/sidebar";

import Tips from "../ForumsPage/helpers/Tips";
import { Container, Row, Col } from "react-bootstrap";
import NavUser from "../../navigation/NavUser/NavUser";
import MyPosts from './MyPosts';

function MyPostsPAge() {
 
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
          <MyPosts />
        </div>
        <div style={{ flex: " 2 2 0" }} className="mt-4  w-100 tips">
          <Tips />
        </div>
      </div>
    </>


  )
}

export default MyPostsPAge
