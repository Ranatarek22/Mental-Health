import React from "react";
import { apiInstance } from "../../axios";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const CreateForumForm = () => {
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
    try {
      const response = await apiInstance.post("/posts", values);

      if (response.status === 201) {
        toast.success("Forum created successfully!");
        const postId = response.data.id;
        console.log(postId);
        const postDetailsResponse = await apiInstance.get(`/posts/${postId}`);

        if (postDetailsResponse.status === 200) {
          // Do something with the post details, for example, log to console
          console.log("Post Details:", postDetailsResponse.data);
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
    <div className="d-flex flex-column p-3 m-3 forum-card ">
      <h1 className="d-flex justify-content-center p-2 m-1 fw-bold forum-details">
        Forum Details
      </h1>
      <div className="m-3 p-4">
        <h5 className="fw-bold">What's on your mind?</h5>
        <h6 className="m-1 forum-data">Enter all forum details</h6>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="horizontal">
          <div className="mb-3 input-groups">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              placeholder="Enter forum title"
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
          <label htmlFor="content">Description</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            placeholder="Enter forum description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content && (
            <p className="error">{formik.errors.content}</p>
          )}
        </div>
        {/* <div className="image-upload">Upload Image</div> */}

        <button
          type="submit"
          disabled={formik.isSubmitting}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0B570E",
            color: "#FFFFFF",
            marginTop: "10px",
            alignSelf: "flex-end",
            width: "25%",
            borderRadius: "11px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateForumForm;
