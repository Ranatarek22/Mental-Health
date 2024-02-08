import React from "react";

function ForumList() {
  return (
    <div>
      <div className="cont4 p-2 m-3">
        <input type="text" className="p-2 m-2" placeholder="Search for forum" />
        <button className="p-2 m-2">Create Forum</button>
      </div>
      <div className="cont p-2 m-3 align-items-center">
        <div className="flex-grow-1">
          <div className="cont p-2 m-2 ">
            <div className="fw-bold flex-grow-1">
              Depression Across the Lifespan: Children, Teens, and Adults
            </div>
            <div className="flex-column">
              <span>like</span>
            </div>
          </div>

          <div className="cont m-2 ">
            <div>
              <img src="/Avatars.png" className="pe-2" />
            </div>
            <div className="flex-grow-1">
              <span className="fw-bold m-0">rana</span>
              <br />
              <p className="text-muted">2 weeks</p>
            </div>
            <div>
              <span className="pt-2 mt-3">comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumList;
