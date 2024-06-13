import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/use-auth-store";
import { apiInstance } from "../../axios";
import toast from "react-hot-toast";
import { object, string } from "yup";
import { useDropzone } from "react-dropzone";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { BsUpload } from "react-icons/bs";

const CreateForumForm = () => {
  const [check, setChecked] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleToggle = () => {
    setChecked((prev) => !prev);
  };
  const userId = useAuthStore((state) => state.userId);
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    content: "",
    postPhoto: null,
  };

  const validationSchema = object().shape({
    title: string().required("Title is required"),
    content: string().required("Description is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("photoPost", values.postPhoto);
      formData.append("isAnonymous", check);

      const response = await apiInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Forum created successfully!");
        const postId = response.data.id;
        const postDetailsResponse = await apiInstance.get(`/posts/${postId}`);

        if (postDetailsResponse.status === 200) {
          navigate(`/forums/${postId}`);
        }
        resetForm();
        setUploadedImage(null);
      }
    } catch (error) {
      console.error("Error creating forum:", error);
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      formik.setFieldValue("postPhoto", file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    formik.setFieldValue("postPhoto", null);
    setUploadedImage(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="forum-card">
      <h1>Create Post</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="error">{formik.errors.title}</p>
          )}
        </div>
        <div>
          <textarea
            id="content"
            name="content"
            rows={8}
            placeholder="What's on your mind?"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content && (
            <p className="error">{formik.errors.content}</p>
          )}
        </div>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag & drop an image here, or click to select one
              <p>
                <BsUpload size={24} />
              </p>
            </p>
          )}
        </div>
        {uploadedImage && (
          <div className="uploaded-image">
            <button
              type="button"
              className="remove-image"
              onClick={removeImage}
            >
              x
            </button>
            <img src={uploadedImage} alt="Uploaded" />
          </div>
        )}
        <label className="switch">
          <input type="checkbox" onClick={handleToggle} checked={check} />
          <span className="slider round"></span>
        </label>
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateForumForm;
