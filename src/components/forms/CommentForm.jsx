import React from "react";
import { apiInstance } from "../../axios";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import axios from "axios";
import { useFormik } from "formik";

const CommentForm = ({ commentId, postId, onAddComment }) => {
  const commentschema = object().shape({
    content: string(),
  });
  const url = commentId
    ? `/posts/${postId}/comments/${commentId}/replies`
    : `/posts/${postId}/comments`;
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: commentschema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values));
      const cancelToken = axios.CancelToken.source();
      try {
        const commentPromise = await apiInstance.post(url, values, {
          cancelToken: cancelToken.token,
        });
        if (commentPromise.status !== 201) {
          if (commentPromise.response.data) {
            throw new Error(Object.values(commentPromise.response.data)[0]);
          } else {
            throw new Error(commentPromise.statusText);
          }
        }
        console.log(commentPromise);
        if (onAddComment) {
          const addedComment = await commentPromise.data;
          onAddComment(addedComment);
        }
        toast.success("Comment created");
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("cancelled");
        } else {
          if (typeof error === "object") {
            toast.error(Object.values(error.response.data)[0]);
          } else {
            console.error(error);
          }
        }
        console.error(error);
      }

      return () => {
        cancelToken.cancel("cancelled by user");
      };
    },
  });

  const isSubmiting = formik.isSubmitting;
  return (
    <div className="w-100 ">
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex justify-content-center align-items-center gap-2"
      >
        <div className="input-field">
          <input
            name="content"
            disabled={isSubmiting}
            onChange={formik.handleChange}
            value={formik.values.content}
            onBlur={formik.handleBlur}
            style={{
              borderRadius: "50px",
              borderColor: "#EEEEEE",
              backgroundColor: "FFFFFF",
            }}
            placeholder="Add Comment"
            className="pe-2 "
            type="text"
          ></input>

          {formik.touched["content"] && Boolean(formik.errors["content"]) && (
            <p className="error">{formik.errors["content"]}</p>
          )}
        </div>
        {/* <button type="submit" disabled={isSubmiting}>
          comment
        </button> */}
      </form>
    </div>
  );
};

export default CommentForm;
