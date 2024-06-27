import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { apiInstance } from "../../../axios";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    type: "select",
    question: "How often do you feel hopeless or helpless?",
    options: ["Sometimes", "Always", "Never", "Usually"],
  },
  {
    type: "select",
    question:
      "How often do you have trouble sleeping or experience changes in your sleep patterns (e.g., insomnia or oversleeping)?",
    options: ["Sometimes", "Always", "Never", "Usually"],
  },
  {
    type: "select",
    question: "How often do you feel excessively tired or lack energy?",
    options: ["Sometimes", "Always", "Never", "Usually"],
  },
  {
    type: "select",
    question:
      "How often do you lose interest or pleasure in activities you used to enjoy?",
    options: ["Sometimes", "Always", "Never", "Usually"],
  },
  {
    type: "select",
    question:
      "How often do you experience difficulty concentrating or making decisions?",
    options: ["Sometimes", "Always", "Never", "Usually"],
  },
  {
    type: "select",
    question: "How often do you feel worthless or excessively guilty?",
    options: ["Sometimes", "Always", "Never", "Usually"],
  },
  { type: "textarea", question: "Tell us your story" },
];

const validationSchema = Yup.object(
  questions.reduce((acc, curr, idx) => {
    if (curr.type !== "textarea") {
      acc[`question${idx}`] = Yup.string().required("This field is required");
    } else {
      acc[`question${idx}`] = Yup.string().required("This field is required");
    }
    return acc;
  }, {})
);

const MentalHealthTest = () => {
  const navigate = useNavigate();
  const [isDepressed, setIsDepressed] = useState(false);
  const [popup, setPopup] = useState({ open: false, message: "" });

  const formik = useFormik({
    initialValues: questions.reduce((acc, curr, idx) => {
      acc[`question${idx}`] = "";
      return acc;
    }, {}),
    validationSchema,
    onSubmit: async (values) => {
      const responseCounts = { sometimes: 0, always: 0, never: 0, usually: 0 };

      questions.forEach((q, idx) => {
        if (q.type !== "textarea") {
          responseCounts[values[`question${idx}`].toLowerCase()] += 1;
        }
      });

      const payload = {
        text: values[`question6`],
        ...responseCounts,
      };

      try {
        const response = await apiInstance.post(
          "/users/test-depression",
          JSON.stringify(payload),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsDepressed(response.data);
        if (response.data) {
          setPopup({
            open: true,
            message:
              "You are depressed. Please seek help from a mental health professional or check ur community.",
          });
        } else {
          setPopup({
            open: true,
            message: "You are normal. Keep maintaining your mental health!",
          });
        }
        toast.success("Form submitted successfully!");
      } catch (error) {
        toast.error("Error submitting form.");
      }
    },
  });

  return (
    <div className="MentalHealthTest" id="MentalHealthTest">
      <Toaster />
      {popup.open && (
        <div className="popup-bg">
          <div className="popup">
            <div className="popup-content">
              <p>{popup.message}</p>

              {isDepressed && (
                <div className="actions">
                  <button
                    onClick={() => navigate("/doctors", { replace: true })}
                  >
                    Doctors
                  </button>
                  <button
                    onClick={() =>
                      navigate("/forums/forumlist", { replace: true })
                    }
                  >
                    Forums
                  </button>
                </div>
              )}
              <button onClick={() => setPopup({ open: false, message: "" })}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <section id="articles" className="mentalHealthTest">
        <h3>Depression Test</h3>
        <form onSubmit={formik.handleSubmit} className="form">
          {questions.map((q, idx) => (
            <div key={idx} className="form-group">
              <label>{q.question}</label>
              {q.type === "textarea" ? (
                <div>
                  <textarea
                    name={`question${idx}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[`question${idx}`]}
                    className="textarea"
                  />
                  {formik.touched[`question${idx}`] &&
                  formik.errors[`question${idx}`] ? (
                    <div className="error">
                      {formik.errors[`question${idx}`]}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div>
                  <select
                    name={`question${idx}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[`question${idx}`]}
                    className="select"
                  >
                    <option value="">Select an option</option>
                    {q.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {formik.touched[`question${idx}`] &&
                  formik.errors[`question${idx}`] ? (
                    <div className="error">
                      {formik.errors[`question${idx}`]}
                    </div>
                  ) : null}
                </div>
              )}
              <hr />
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default MentalHealthTest;
