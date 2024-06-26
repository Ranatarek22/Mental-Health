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
          <img src="/landingImages/Doctor4.png" alt="hero" />
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


export default Hero;
