import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { apiInstance } from "../../../axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showResult, setShowResult] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

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
        setShowResult(true);
        toast.success("Form submitted successfully!");
      } catch (error) {
        toast.error("Error submitting form.");
      }
    },
  });

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="MentalHealthTest" id="MentalHealthTest">
      <Toaster />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        id=""
        className="mentalHealthTest"
      >
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
                <div className="select-wrapper">
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
      </motion.section>

      <AnimatePresence>
        {showResult && (
          <motion.section
            id="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="result-section"
          >
            <h3>Test Results</h3>
            <div className="result-card">
              <div className="result-header">
                <h4>
                  {isDepressed
                    ? "Depression Indicated"
                    : "No Depression Indicated"}
                </h4>
              </div>
              <p className="result-description">
                {isDepressed
                  ? "Based on your responses, there are indications of depression. It's important to consult with a mental health professional for a proper diagnosis and support."
                  : "Your responses suggest no significant indicators of depression. However, if you have concerns, don't hesitate to speak with a mental health professional."}
              </p>
              {isDepressed && (
                <div className="result-actions">
                  <button
                    onClick={() => navigate("/doctors", { replace: true })}
                  >
                    Find a Doctor
                  </button>
                  <button
                    onClick={() =>
                      navigate("/forums/forumlist", { replace: true })
                    }
                  >
                    Join Support Community
                  </button>
                </div>
              )}
            </div>

            <div className="accordion">
              <div className="accordion-item">
                <button
                  className={`accordion-title ${
                    activeAccordion === 0 ? "active" : ""
                  }`}
                  onClick={() => toggleAccordion(0)}
                >
                  How our test works
                </button>
                <AnimatePresence>
                  {activeAccordion === 0 && (
                    <motion.div
                      className="accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>Our 3-Phase Analysis Process:</h4>
                      <ol>
                        <li>
                          <strong>Response Weighting:</strong> We assign weights
                          to your responses to determine if the overall
                          sentiment tends to be more negative.
                        </li>
                        <li>
                          <strong>Sentiment Analysis:</strong> We use advanced
                          techniques like VADER and RoBERTa, combined with user
                          analysis, to assess if your responses indicate
                          potential issues.
                        </li>
                        <li>
                          <strong>Depression Analysis:</strong> We compare your
                          responses against a database of over 10,000 depression
                          cases using machine learning models (decision trees,
                          logistic regression, and support vector machines) to
                          identify similarities.
                        </li>
                      </ol>
                      <p>
                        This multi-phase approach allows us to provide a
                        comprehensive assessment. However, it's important to
                        note that this test is not a clinical diagnosis. Always
                        consult with a mental health professional for a proper
                        evaluation.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="accordion-item">
                <button
                  className={`accordion-title ${
                    activeAccordion === 1 ? "active" : ""
                  }`}
                  onClick={() => toggleAccordion(1)}
                >
                  Let's take action now
                </button>
                <AnimatePresence>
                  {activeAccordion === 1 && (
                    <motion.div
                      className="accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4>Access our Nexus community</h4>
                      <p>
                        Join our supportive community to connect with others who
                        understand what you're going through. Share experiences
                        and find support.
                      </p>
                      <button
                        onClick={() =>
                          navigate("/forums/forumlist", { replace: true })
                        }
                      >
                        Join Community
                      </button>

                      <h4>Access pro doctors</h4>
                      <p>
                        Consult with professional doctors who specialize in
                        mental health. Book appointments and get the help you
                        need.
                      </p>
                      <button
                        onClick={() => navigate("/doctors", { replace: true })}
                      >
                        Find Doctors
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentalHealthTest;
