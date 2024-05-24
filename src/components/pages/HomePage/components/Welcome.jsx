import React from "react";
import { motion } from "framer-motion";
import { FaArrowTurnDown } from "react-icons/fa6";

export function Welcome() {
  return (
    <motion.div
      className="landing container-fluid"
      style={{
        width: "100vw",
        marginLeft: "calc((100% - 100vw) / 2)",
        backgroundColor: "var(--fourth-color)",
        padding: "100px",
        paddingTop: "24px",
        height: "100vh",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <div className="container">
        <div className="text">
          <h1>Are You Feeling Overwhelmed?</h1>
          <p>
            Life can sometimes feel like a heavy burden. It’s okay to feel
            overwhelmed, and it’s okay to seek help. If you’re experiencing
            feelings of depression or having thoughts of self-harm, please know
            that you’re not alone.
          </p>
        </div>
        <div className="image">
          <img src="/landingImages/depressed.png" alt="hero" />
        </div>
      </div>
      <a href="#articles" className="go-down">
        <FaArrowTurnDown />
      </a>
    </motion.div>
  );
}

// return (
//     <div
//         className="container-fluid"
//         style={{
//             width: "100vw",
//             marginLeft: "calc((100% - 100vw) / 2)",
//             background:
//                 "linear-gradient(to bottom, #cae7ef, #e8f1ff, #ffffff)",
//             padding: "100px",
//             paddingTop: "0px",
//         }}
//     >
//         <div className="hero-section">
//             <div className="up-section">
//                 <img
//                     src={"/landingImages/depressed.png"}
//                     alt="hero"
//                     style={{
//                         width: "40%",
//                     }}
//                 />
//                 <div className="text">
//                     <div className="text-up">
//                         <h3
//                             className="mb-5"
//                             style={{
//                                 fontSize: "4rem",
//                                 fontWeight: 600,
//                             }}
//                         >
//                             Are You Feeling Overwhelmed?
//                         </h3>
//                         <p
//                             className="mt-3"
//                             style={{
//                                 fontSize: "1.2rem",
//                                 color: "#0000008a",
//                             }}
//                         >
//                             Life can sometimes feel like a heavy burden.
//                             It’s okay to feel overwhelmed, and it’s okay to
//                             seek help. If you’re experiencing feelings of
//                             depression or having thoughts of self-harm,
//                             please know that you’re not alone.
//                         </p>

//                         <p
//                             className="mt-3"
//                             style={{
//                                 fontSize: "1.2rem",
//                                 color: "#0000008a",
//                             }}
//                         >
//                             Remember, it’s okay to seek help. You’re not
//                             alone in your journey. Join us today and take
//                             the first step towards better mental health.
//                         </p>
//                     </div>
//                     <a href={"/signup"}>
//                         <button
//                             style={{
//                                 backgroundColor: "transparent",
//                                 color: "black",
//                                 fontWeight: 600,
//                                 border: "2px solid black",
//                                 fontSize: "1.2rem",
//                             }}
//                         >
//                             Join Us Now
//                         </button>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
