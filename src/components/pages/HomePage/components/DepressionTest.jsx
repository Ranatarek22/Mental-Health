import React from "react";
import { motion } from "framer-motion";

function DepressionTest() {
  return (
    <motion.div
      id="depressiontest" // Adding the id attribute here
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
        <div className="image">
          <img
            src="/landingImages/Doctor5.png"
            alt="hero"
            style={{ width: "55%" }}
          />
        </div>
        <div className="text">
          <h1> Take Depression Test</h1>
          <p>
            This Test will help you to know if you're depressed or not and if
            you're depressed will assist you to have treatments
          </p>
          <a href="/depressiontest">
            <button>Test</button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default DepressionTest;
