import React, { useEffect, useState } from "react";
import { apiInstance } from "../../axios";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/use-auth-store";

const CreateForumForm = () => {
  const [check, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(true);
    return check; 
  };
  const userId = useAuthStore((state) => state.userId);
  const initialValues = {
    title: "",
    // tags: "",
    content: "",
  };

  const validationSchema = object().shape({
    title: string().required("Title is required"),
    // tags: string(),
    content: string().required("Description is required"),
  });
  const history = useNavigate();
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    // window.location.reload();
    try {
      const postData = {
        ...values,
        isAnonymous: check,
      };

      const response = await apiInstance.post("/posts", postData);
      console.log(check);

      if (response.status === 201) {
        toast.success("Forum created successfully!");
        const postId = response.data.id;
        console.log(postId);
        const postDetailsResponse = await apiInstance.get(`/posts/${postId}`);

        if (postDetailsResponse.status === 200) {
          // console.log("Post Details:", postDetailsResponse.data);

          history(`/forums/${postId}`);
        }
        resetForm();
      }
    } catch (error) {
      console.error("Error creating forum:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="forum-card ">
      <div className="d-flex justify-content-around align-items-center ">
        <div className="d-flex  flex-column p-2 fw-bold forum-details">
          Post
        </div>
        <div className="vertical-line"></div>
        <div className="d-flex flex-column p-2  fw-bold forum-details">
          Image
        </div>
      </div>
      <div className="hr"></div>

      {/* <div className="m-3 p-4">
        <h5 className="fw-bold">What's on your mind?</h5>
        <h6 className="m-1 forum-data">Enter all forum details</h6>
      </div> */}
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="horizontal">
          <div className="mb-3 input-groups">
            {/* <label htmlFor="title">Title</label> */}
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              placeholder=" Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="error">{formik.errors.title}</p>
            )}
          </div>
        </div>
        {/* <div className="horizontal">
          <div className="mb-3 input-groups">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              name="tags"
              type="text"
              className="form-control"
              placeholder="tag1,tag2,etc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tags}
            />
            {formik.touched.tags && formik.errors.tags && (
              <p className="error">{formik.errors.tags}</p>
            )}
          </div>
        </div> */}
        <div className="input-groups">
          {/* <label htmlFor="content">Description</label> */}
          <textarea
            id="content"
            name="content"
            rows={8}
            placeholder="What's on your mind ?"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content && (
            <p className="error">{formik.errors.content}</p>
          )}
        </div>

        <label class="switch">
          <input type="checkbox" onClick={handleToggle} />
          <span class="slider round"></span>
        </label>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3699a2",
            color: "#FFFFFF",
            marginTop: "10px",
            border: "none",
            alignSelf: "center",
            width: "69%",
            borderRadius: "50px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateForumForm;
