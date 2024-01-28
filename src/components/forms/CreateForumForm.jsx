import React from "react";
import { apiInstance } from "../../axios";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import axios from "axios";
import { useFormik } from "formik";
const CreateForumForm = () => {
  return (
    <div className="d-flex flex-column p-3 m-3 forum-card ">
      <h1 className="d-flex justify-content-center p-2 m-1 fw-bold forum-details">
        Forum Details
      </h1>
      <div className=" m-3 p-4 ">
        <h5 className="fw-bold">What's on your mind ?</h5>
        <h6 className="m-1 forum-data">Enter all forum details</h6>
      </div>
      <form className="">
        <div className="horizontal">
          <div className="mb-3 input-groups">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              placeholder="Enter forum title"
            />
          </div>
          <div className="mb-3 input-groups">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              name="tags"
              type="text"
              className="form-control"
              placeholder="tag1,tag2,etc"
            />
          </div>
        </div>
        <div className="input-groups">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={8}
            placeholder="Enter forum description"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default CreateForumForm;
