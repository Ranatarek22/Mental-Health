import React, { useEffect } from "react";
import { apiInstance } from "../../axios";
import toast from "react-hot-toast";
import { object, string, number } from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { useAuthStore } from "../../hooks/use-auth-store";

const CommentForm = ({
  commentId,
  postId,
  onAddComment,
  intialData,
  onUpdateComment,
  parentId,
}) => {
  const token = useAuthStore((state) => state.token);
  const commentschema = object().shape({
    content: string(),
  });
  const url = parentId
    ? `/posts/${postId}/comments/${parentId}/replies`
    : `/posts/${postId}/comments`;
  const formik = useFormik({
    initialValues: {
      ...intialData,
    },
    validationSchema: commentschema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values));
      if (!values.content) {
        formik.setFieldError("content", "Can't post empty commet!");
        return;
      }
      const cancelToken = axios.CancelToken.source();
      try {
        let commentPromise;
        if (intialData) {
          commentPromise = await apiInstance.put(
            url.concat(`/${commentId}`),
            values,
            {
              cancelToken: cancelToken.token,
            }
          );
        } else {
          commentPromise = await apiInstance.post(url, values, {
            cancelToken: cancelToken.token,
          });
        }
        console.log(commentPromise);
        if (![201, 200].includes(commentPromise.status)) {
          if (commentPromise.response?.data) {
            throw new Error(Object.values(commentPromise.response.data)[0]);
          } else {
            throw new Error(commentPromise.statusText);
          }
        }
        // console.log(commentPromise);
        if (intialData) {
          if (onUpdateComment) {
            const updatedComment = await commentPromise.data;
            onUpdateComment(updatedComment);
          }
          toast.success("Comment Updated");
        } else {
          if (onAddComment) {
            const addedComment = await commentPromise.data;
            onAddComment(addedComment);
          }
          toast.success("Comment created");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("cancelled");
        } else {
          if (typeof error === "object" && error.response) {
            if (error.response.status === 401) {
              toast.error("Unauthorized");
            } else if (error.response.status === 403) {
              toast.error("Your comment violates our policies");
            } else {
              toast.error(Object.values(error.response.data)[0]);
            }
          } else {
            console.error(error);
          }
        }
        // console.error(error);
      }

      return () => {
        cancelToken.cancel("cancelled by user");
      };
    },
  });

  // console.log(intialData);
  const isSubmiting = formik.isSubmitting;
  useEffect(() => {
    if (intialData) {
      formik.setFieldValue("content", intialData.content);

      console.log(intialData);
    }
  }, [intialData]);

  // console.log(intialData);
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

      </form>
    </div>
  );
};

export default CommentForm;
