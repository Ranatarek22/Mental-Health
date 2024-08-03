import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaArrowTurnDown } from "react-icons/fa6";
import { styles } from "../styles";
// import { ComputersCanvas } from "./canvas";

function Hero() {
  return (
    <motion.div
      className="landing container-fluid"
      style={{
        width: "100vw",
        marginLeft: "calc((100% - 100vw) / 2)",
        backgroundColor: "",
        paddingTop: "24px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeIn" }}
    >
      <div className="container">
        <div className="text">
          <h1 className={`${styles.heroHeadText}`}>
            <span style={{ color: "black" }}> Welcome to </span>
            <span className="text-[#3699a2]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('<span style="color: #3699a2;">NEXUS</span>')
                    .callFunction(() => {
                      console.log("String typed out!");
                    })
                    .pauseFor(2500)
                    .deleteAll()
                    .callFunction(() => {
                      console.log("All strings were deleted");
                    })
                    .start();
                }}
                options={{
                  strings: [
                    '<span style="color: #3699a2;">NEXUS</span>',
                    '<span style="color:  #3699a2;;">Mental Health Platform</span>',
                    '<span style="color:  #3699a2;;">Safe Community</span>',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                }}
              />
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            We aim to help people who has
            <br className="sm:block hidden" />
            mental health disorder
          </p>
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

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </motion.div>
  );
}

export default Hero;
