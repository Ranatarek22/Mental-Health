import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { apiInstance } from "../../../axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthStore } from "../../../hooks/use-auth-store";

const questions = [
  {
    question: "Question 1",
    options: [
      { label: "I do not feel sad.", score: 0 },
      { label: "I feel sad.", score: 1 },
      { label: "I am sad all the time and I can't snap out of it.", score: 2 },
      { label: "I am so sad and unhappy that I can't stand it.", score: 3 },
    ],
  },
  {
    question: "Question 2",
    options: [
      {
        label: "I am not particularly discouraged about the future.",
        score: 0,
      },
      { label: "I feel discouraged about the future.", score: 1 },
      { label: "I feel I have nothing to look forward to.", score: 2 },
      {
        label: "I feel the future is hopeless and that things cannot improve.",
        score: 3,
      },
    ],
  },
  {
    question: "Question 3",
    options: [
      { label: "I do not feel like a failure.", score: 0 },
      { label: "I feel I have failed more than the average person.", score: 1 },
      {
        label: "As I look back on my life, all I can see is a lot of failures.",
        score: 2,
      },
      { label: "I feel I am a complete failure as a person.", score: 3 },
    ],
  },
  {
    question: "Question 4",
    options: [
      {
        label: "I get as much satisfaction out of things as I used to.",
        score: 0,
      },
      { label: "I don't enjoy things the way I used to.", score: 1 },
      {
        label: "I don't get real satisfaction out of anything anymore.",
        score: 2,
      },
      { label: "I am dissatisfied or bored with everything.", score: 3 },
    ],
  },
  {
    question: "Question 5",
    options: [
      { label: "I don't feel particularly guilty", score: 0 },
      { label: "I feel guilty a good part of the time.", score: 1 },
      { label: "I feel quite guilty most of the time.", score: 2 },
      { label: "I feel guilty all of the time.", score: 3 },
    ],
  },
  {
    question: "Question 6",
    options: [
      { label: "I don't feel I am being punished.", score: 0 },
      { label: "I feel I may be punished.", score: 1 },
      { label: "I expect to be punished.", score: 2 },
      { label: "I feel I am being punished.", score: 3 },
    ],
  },
  {
    question: "Question 7",
    options: [
      { label: "I don't feel disappointed in myself.", score: 0 },
      { label: "I am disappointed in myself.", score: 1 },
      { label: "I am disgusted with myself.", score: 2 },
      { label: "I hate myself.", score: 3 },
    ],
  },
  {
    question: "Question 8",
    options: [
      { label: "I don't feel I am any worse than anybody else.", score: 0 },
      {
        label: "I am critical of myself for my weaknesses or mistakes.",
        score: 1,
      },
      { label: "I blame myself all the time for my faults.", score: 2 },
      { label: "I blame myself for everything bad that happens.", score: 3 },
    ],
  },
  {
    question: "Question 9",
    options: [
      { label: "I don't have any thoughts of killing myself.", score: 0 },
      {
        label:
          "I have thoughts of killing myself, but I would not carry them out.",
        score: 1,
      },
      { label: "I would like to kill myself.", score: 2 },
      { label: "I would kill myself if I had the chance.", score: 3 },
    ],
  },
  {
    question: "Question 10",
    options: [
      { label: "I don't cry any more than usual.", score: 0 },
      { label: "I cry more now than I used to.", score: 1 },
      { label: "I cry all the time now.", score: 2 },
      {
        label:
          "I used to be able to cry, but now I can't cry even though I want to.",
        score: 3,
      },
    ],
  },
  {
    question: "Question 11",
    options: [
      { label: "I am no more irritated by things than I ever was.", score: 0 },
      { label: "I am slightly more irritated now than usual.", score: 1 },
      {
        label: "I am quite annoyed or irritated a good deal of the time.",
        score: 2,
      },
      { label: "I feel irritated all the time.", score: 3 },
    ],
  },
  {
    question: "Question 12",
    options: [
      { label: "I have not lost interest in other people.", score: 0 },
      {
        label: "I am less interested in other people than I used to be.",
        score: 1,
      },
      { label: "I have lost most of my interest in other people.", score: 2 },
      { label: "I have lost all of my interest in other people.", score: 3 },
    ],
  },
  {
    question: "Question 13",
    options: [
      { label: "I make decisions about as well as I ever could.", score: 0 },
      { label: "I put off making decisions more than I used to.", score: 1 },
      {
        label:
          "I have greater difficulty in making decisions more than I used to.",
        score: 2,
      },
      { label: "I can't make decisions at all anymore.", score: 3 },
    ],
  },
  {
    question: "Question 14",
    options: [
      { label: "I don't feel that I look any worse than I used to.", score: 0 },
      {
        label: "I am worried that I am looking old or unattractive.",
        score: 1,
      },
      {
        label:
          "I feel there are permanent changes in my appearance that make me look unattractive.",
        score: 2,
      },
      { label: "I believe that I look ugly.", score: 3 },
    ],
  },
  {
    question: "Question 15",
    options: [
      { label: "I can work about as well as before.", score: 0 },
      {
        label: "It takes an extra effort to get started at doing something.",
        score: 1,
      },
      { label: "I have to push myself very hard to do anything.", score: 2 },
      { label: "I can't do any work at all.", score: 3 },
    ],
  },
  {
    question: "Question 16",
    options: [
      { label: "I can sleep as well as usual.", score: 0 },
      { label: "I don't sleep as well as I used to.", score: 1 },
      {
        label:
          "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.",
        score: 2,
      },
      {
        label:
          "I wake up several hours earlier than I used to and cannot get back to sleep.",
        score: 3,
      },
    ],
  },
  {
    question: "Question 17",
    options: [
      { label: "I don't get more tired than usual.", score: 0 },
      { label: "I get tired more easily than I used to.", score: 1 },
      { label: "I get tired from doing almost anything.", score: 2 },
      { label: "I am too tired to do anything.", score: 3 },
    ],
  },
  {
    question: "Question 18",
    options: [
      { label: "My appetite is no worse than usual.", score: 0 },
      { label: "My appetite is not as good as it used to be.", score: 1 },
      { label: "My appetite is much worse now.", score: 2 },
      { label: "I have no appetite at all anymore.", score: 3 },
    ],
  },
  {
    question: "Question 19",
    options: [
      { label: "I haven't lost much weight, if any, lately.", score: 0 },
      { label: "I have lost more than five pounds.", score: 1 },
      { label: "I have lost more than ten pounds.", score: 2 },
      { label: "I have lost more than fifteen pounds.", score: 3 },
    ],
  },
  {
    question: "Question 20",
    options: [
      { label: "I am no more worried about my health than usual.", score: 0 },
      {
        label:
          "I am worried about physical problems like aches, pains, upset stomach, or constipation.",
        score: 1,
      },
      {
        label:
          "I am very worried about physical problems and it's hard to think of much else.",
        score: 2,
      },
      {
        label:
          "I am so worried about my physical problems that I cannot think of anything else.",
        score: 3,
      },
    ],
  },
  {
    question: "Question 21",
    options: [
      {
        label: "I have not noticed any recent change in my interest in sex.",
        score: 0,
      },
      { label: "I am less interested in sex than I used to be.", score: 1 },
      { label: "I have almost no interest in sex.", score: 2 },
      { label: "I have lost interest in sex completely.", score: 3 },
    ],
  },
  {
    question: "How did your father and mother punish you?",
    type: "textarea",
    skip: "22",
  },
  {
    question: "What is your impression of the atmosphere of the house?",
    type: "textarea",
  },
  {
    question: "Who are the most important people in your life?",
    type: "textarea",
    skip: "22",
  },
  {
    question: "Tell us your problem",
    type: "textarea",
  },
  {
    question:
      "Mention the most important events that you believe are related to this problem",
    type: "textarea",
  },
  {
    question: "What solutions do you think will help solve your problem?",
    type: "textarea",
  },

  {
    question:
      "Tell us about your experience with suicidal thoughts or attempts if you have any (if you dont have any leave it blank)",
    type: "textarea",
  },
];

const validationSchema = Yup.object().shape(
  questions.reduce(
    (acc, question, index) => {
      if (question.type === "textarea") {
        acc[`question${index}`] = Yup.string();
      } else {
        acc[`question${index}`] = Yup.string().required(
          "Please select an option"
        );
      }
      return acc;
    },
    {
      age: Yup.number()
        .required("Age is required")
        .positive("Age must be positive")
        .integer("Age must be an integer"),
      gender: Yup.string().required("Gender is required"),
    }
  )
);

const MentalHealthTest = () => {
  const navigate = useNavigate();
  const [isDepressed, setIsDepressed] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const formik = useFormik({
    initialValues: {
      age: "",
      gender: "",
      ...questions.reduce((acc, question, index) => {
        acc[`question${index}`] = "";
        return acc;
      }, {}),
    },
    validationSchema,
    onSubmit: async (values) => {
      let sum = 0;
      let textResponses = [];

      questions.forEach((q, idx) => {
        if (q.options) {
          const selectedOption = q.options.find(
            (option) => option.label === values[`question${idx}`]
          );
          if (selectedOption) {
            sum += selectedOption.score;
          }
        } else if (q.type === "textarea" && q.skip !== "22") {
          textResponses.push(values[`question${idx}`]);
        }
      });

      function isArrayContainingOnlySpaces(arr) {
        return arr.every((item) => item.trim() === "");
      }

      if (
        textResponses.length === 0 ||
        isArrayContainingOnlySpaces(textResponses)
      ) {
        textResponses = ["none"];
      }

      const text = textResponses.join(" ");
      const payload = {
        sum,
        text,
        age: values.age,
        gender: values.gender,
      };

      console.log(payload);

      try {
        const response = await apiInstance.post(
          "/depression-tests",
          JSON.stringify(payload),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.result == "Depressed") {
          setIsDepressed(true);
        } else {
          setIsDepressed(false);
        }
        setShowResult(true);
        toast.success("Form submitted successfully!");
      } catch (error) {
        toast.error("Error submitting form.");
      }
    },
  });

  return (
    <div id="MentalHealthTest">
      <Toaster />
      <motion.div
        id="depressiontest"
        className="landing container-fluid"
        style={{
          width: "100vw",
          marginLeft: "calc((100% - 100vw) / 2)",
          backgroundColor: "white",
          paddingTop: "24px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeIn" }}
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          id="test"
          className="MentalHealthTest"
          style={{
            backgroundColor: "white",
            borderRadius: "33px",
          }}
        >
          <div style={{ position: "relative", textAlign: "center" }}>
            <h2
              style={{
                color: "white",
                position: "absolute",
                bottom: "30%",
                fontSize: "5vw",
                width: "100%",
                zIndex: 1,
              }}
            >
              Depression Test
            </h2>
            <img
              src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_287_139_1148x556/public/hero_image/pt_self_test/2024-05/tests-depression-hero-large.jpg.webp?itok=K0rS3jPG"
              alt="Depression Test"
              className="img-fluid mb-4"
              style={{ width: "100%", borderRadius: "33px" }}
            />
          </div>

          <div style={{ width: "80%", textAlign: "center" }}>
            <form onSubmit={formik.handleSubmit} className="form">
              <div
                style={{
                  border: "1px solid #e6e6e6",
                  padding: "10px",
                  borderRadius: "15px",
                  width: "55%",
                }}
              >
                <div className="form-group mb-4">
                  <label className="label">Age</label>
                  <input
                    type="number"
                    name="age"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age}
                    className="form-control"
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div className="text-danger">{formik.errors.age}</div>
                  ) : null}
                </div>

                <div className="form-group mb-4">
                  <label className="label">Gender</label>
                  <select
                    name="gender"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                    className="form-control"
                  >
                    <option value="" label="Select gender" />
                    <option value="male" label="Male" />
                    <option value="female" label="Female" />
                    <option value="other" label="Other" />
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="text-danger">{formik.errors.gender}</div>
                  ) : null}
                </div>
              </div>

              <ol>
                <hr />
                {questions.map((q, idx) => (
                  <li key={idx} className="form-group mb-4">
                    {q.type === "textarea" ? (
                      <div>
                        <label
                          style={{ textAlign: "center" }}
                          className="label"
                        >
                          {q.question}
                        </label>
                        <textarea
                          name={`question${idx}`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values[`question${idx}`]}
                          className="form-control"
                          placeholder="Your comments"
                        />
                        {formik.touched[`question${idx}`] &&
                        formik.errors[`question${idx}`] ? (
                          <div className="text-danger">
                            {formik.errors[`question${idx}`]}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="options-container option">
                        {q.options.map((option, optionIdx) => (
                          <div
                            key={option.label}
                            className="form-check form-check-inline option"
                          >
                            <input
                              type="radio"
                              className="form-check-input"
                              name={`question${idx}`}
                              value={option.label}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              checked={
                                formik.values[`question${idx}`] === option.label
                              }
                              id={`question${idx}_option${optionIdx}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`question${idx}_option${optionIdx}`}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                        {formik.touched[`question${idx}`] &&
                        formik.errors[`question${idx}`] ? (
                          <div className="text-danger">
                            {formik.errors[`question${idx}`]}
                          </div>
                        ) : null}
                      </div>
                    )}
                    <hr />
                  </li>
                ))}
              </ol>
              <button type="submit" className="btn test-btn w-75">
                Submit
              </button>
            </form>
          </div>
        </motion.section>
        <AnimatePresence>
          {showResult && (
            <motion.section
              id="result"
              className="MentalHealthTest"
              style={{ backgroundColor: "white", borderRadius: "33px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-center">
                  Result
                  <hr />
                </h3>
              </div>
              <div className="text-center">
                <p>
                  {isDepressed
                    ? "Based on your answers, you might be experiencing symptoms of depression. Please consider reaching out to a mental health professional for further evaluation and support."
                    : "Your responses do not indicate symptoms of depression at this time. If you have concerns, please consult with a mental health professional."}
                </p>
                <div>
                  {isDepressed ? (
                    <div>
                      <button
                        onClick={() => navigate("/signup", { replace: true })}
                        className="btn test-btn"
                      >
                        Find a Doctor
                      </button>
                      <button
                        onClick={() => navigate("/articles", { replace: true })}
                        className="btn btn-secondary m-1 "
                        style={{ borderRadius: "15px" }}
                      >
                        Explore Articles
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() =>
                          navigate("/user/findadoctor", { replace: true })
                        }
                        className="btn test-btn"
                      >
                        You can Join our Community
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MentalHealthTest;
// they are punished my with candles and belt and I felt scary and sad
// my house always in stress and my dad and my mam always fights
// my friends
// I feel lost and i don't want to do anything in my life
// My childhood ,it was awful
// someone to talk to
// i have never go to a therapist
// I think suicide is better than living in this life , I have no experience in suicide
