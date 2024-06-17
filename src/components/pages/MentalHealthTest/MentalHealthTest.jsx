import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const questions = [
  { type: "text", question: "How do you feel today?" },
  { type: "radio", question: "Do you often feel sad?", options: ["Yes", "No"] },
  {
    type: "select",
    question: "How would you rate your mood today?",
    options: ["High", "Medium", "Low"],
  },
  {
    type: "radio",
    question: "Do you have trouble sleeping?",
    options: ["Yes", "No"],
  },
  { type: "text", question: "What activities make you feel better?" },
  {
    type: "select",
    question: "How often do you exercise?",
    options: ["Always", "Often", "Sometimes", "Never"],
  },
  {
    type: "radio",
    question: "Do you feel anxious frequently?",
    options: ["Yes", "No"],
  },
  { type: "text", question: "Describe your support system." },
  {
    type: "select",
    question: "How would you rate your appetite?",
    options: ["High", "Medium", "Low"],
  },
  {
    type: "radio",
    question: "Do you experience mood swings?",
    options: ["Yes", "No"],
  },
  { type: "text", question: "What coping mechanisms do you use?" },
  {
    type: "select",
    question: "How often do you socialize?",
    options: ["Always", "Often", "Sometimes", "Never"],
  },
  { type: "radio", question: "Do you feel hopeless?", options: ["Yes", "No"] },
  { type: "text", question: "What are your hobbies?" },
  {
    type: "select",
    question: "How would you rate your energy levels?",
    options: ["High", "Medium", "Low"],
  },
  {
    type: "radio",
    question: "Do you have trouble concentrating?",
    options: ["Yes", "No"],
  },
  { type: "text", question: "What are your goals for the next month?" },
  {
    type: "select",
    question: "How often do you feel overwhelmed?",
    options: ["Always", "Often", "Sometimes", "Never"],
  },
  { type: "radio", question: "Do you feel lonely?", options: ["Yes", "No"] },
  { type: "text", question: "What makes you feel accomplished?" },
];

const validationSchema = Yup.object(
  questions.reduce((acc, curr, idx) => {
    acc[`question${idx}`] = Yup.string().required("This field is required");
    return acc;
  }, {})
);

const MentalHealthTest = () => {
  const formik = useFormik({
    initialValues: questions.reduce((acc, curr, idx) => {
      acc[`question${idx}`] = "";
      return acc;
    }, {}),
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Form submitted successfully!");
    },
  });

  return (
    <div className="MentalHealthTest">
      <form onSubmit={formik.handleSubmit} className="form">
        {questions.map((q, idx) => (
          <div key={idx} className="form-group">
            {idx !== 0 && <hr />}

            <label>{q.question}</label>
            {q.type === "text" && (
              <div>
                <textarea
                  type="text"
                  name={`question${idx}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[`question${idx}`]}
                  className="input"
                />
              </div>
            )}
            {q.type === "radio" && (
              <div className="q">
                {q.options.map((option) => (
                  <label key={option} className="radio-label">
                    <input
                      type="radio"
                      name={`question${idx}`}
                      value={option}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="radio-input"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {q.type === "select" && (
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
              </div>
            )}
            {formik.touched[`question${idx}`] &&
            formik.errors[`question${idx}`] ? (
              <div className="error">{formik.errors[`question${idx}`]}</div>
            ) : null}
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MentalHealthTest;
