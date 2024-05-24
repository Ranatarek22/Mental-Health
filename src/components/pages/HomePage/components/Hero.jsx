import React from "react";
import { motion } from "framer-motion";
import { FaArrowTurnDown } from "react-icons/fa6";

function Hero() {
  return (
    <motion.div
      className="landing container-fluid"
      style={{
        width: "100vw",
        marginLeft: "calc((100% - 100vw) / 2)",
        backgroundColor: "var(--fourth-color)",
        paddingTop: "24px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <div className="container">
        <div className="text">
          <h1> Medical Services</h1>
          <p>
            We are a dedicated community of medical professionals and
            individuals who understand the importance of mental health. We’re
            here to provide support, resources, and a safe space for those
            seeking help.
          </p>
          <a href="/signup">
            <button>Get Started</button>
          </a>
        </div>
        <div className="image">
          <img src="/landingImages/hero.png" alt="hero" />
        </div>
        <div>
          <a href="#services" className="go-down">
            <FaArrowTurnDown />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// return (
//     <motion.div
//         className="container-fluid"
//         style={{
//             width: "100vw",
//             marginLeft: "calc((100% - 100vw) / 2)",
//             backgroundColor: "var(--fourth-color)",
//             padding: "100px",
//             paddingTop: "24px",
//             height: "100vh",
//         }}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 1, ease: "easeIn" }}
//     >
//         <div className="hero-section">
//             <div className="up-section">
//                 <div className="text">
//                     <div className="text-up">
//                         <h4
//                             className="fw-light"
//                             style={{
//                                 fontSize: "3rem",
//                                 marginBottom: 0,
//                             }}
//                         >
//                             Get Quick
//                         </h4>
//                         <h3
//                             style={{
//                                 fontSize: "4rem",
//                                 fontWeight: 800,
//                             }}
//                         >
//                             Medical Services
//                         </h3>
//                         <p
//                             className="mt-3"
//                             style={{
//                                 color: "#0000008a",
//                                 fontSize: "1.2rem",
//                             }}
//                         >
//                             We are a dedicated community of medical
//                             professionals and individuals who understand the
//                             importance of mental health. We’re here to
//                             provide support, resources, and a safe space for
//                             those seeking help.
//                         </p>
//                     </div>
//                     <a href={"/signup"}>
//                         <button
//                             style={{
//                                 backgroundColor: "white",
//                                 color: "black",
//                                 fontWeight: 700,
//                                 fontSize: "1.2rem",
//                             }}
//                         >
//                             Get Started
//                         </button>
//                     </a>
//                 </div>
//                 <img
//                     src={"/landingImages/hero.png"}
//                     alt="hero"
//                     style={{
//                         width: "45%",
//                     }}
//                 />
//             </div>
//         </div>
//     </motion.div>
// );

export default Hero;
