import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";

const fadeIn = (
  direction = "up",
  type = "spring",
  delay = 0,
  duration = 1
) => ({
  initial: {
    y: direction === "up" ? 100 : -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    },
  },
});

const textVariant = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { delay: delay, duration: 0.75 } },
});

export default function Services() {
  return (
    <div
      className="container-fluid"
      style={{
        width: "100vw",
        marginLeft: "calc((100% - 100vw) / 2)",
        background: "white",
        padding: "100px",
        paddingTop: 0,
      }}
    >
      <motion.section
        id="services"
        className="services"
        variants={fadeIn("", "", 0.1, 1)}
      >
        <motion.h3
          className="mb-5"
          style={{
            fontSize: "4rem",
            fontWeight: "40px",
            letterSpacing: "-2px",
            color: "var(--new-color)",
          }}
          variants={textVariant()}
        >
          Services
        </motion.h3>
        <div className="cards">
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
            className="bg-tertiary  rounded-2xl sm:w-[360px] w-full"
          >
            <motion.div
              className="card"
              variants={fadeIn("up", "spring", 0.5, 0.75)}
            >
              <div className="image">
                <img src={"icon1.png"} width={50} height={50} alt="services" />
              </div>
              <h3>Online Community</h3>
              <p>
                Become part of a compassionate community that understands what
                you’re going through. Share your experiences, learn from others,
                and find comfort in knowing you’re not alone.
              </p>
            </motion.div>
          </Tilt>
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
            className="bg-tertiary  rounded-2xl sm:w-[360px] w-full"
          >
            <motion.div
              className="card"
              variants={fadeIn("up", "spring", 1, 0.75)}
            >
              <div className="image">
                <img src={"icon.png"} width={50} height={50} alt="services" />
              </div>
              <h3 className="text-center">Resources and Articles</h3>
              <p>
                Unlock insights in psychology with 1000+ articles. From mental
                well-being to self-care tips, discover resources to enhance your
                understanding and empower your journey.
              </p>
            </motion.div>
          </Tilt>
          <Tilt
            options={{
              max: 45,
              scale: 1,
              speed: 450,
            }}
            className="bg-tertiary  rounded-2xl sm:w-[360px] w-full"
          >
            <motion.div
              className="card"
              variants={fadeIn("up", "spring", 1.5, 0.75)}
            >
              <div className="image">
                <img src={"icon1.png"} width={50} height={50} alt="services" />
              </div>
              <h3>Ask the Experts</h3>
              <p>
                Have your questions answered by licensed professionals. Our
                panel of experienced psychologists and therapists are here to
                provide guidance and advice.
              </p>
            </motion.div>
          </Tilt>
        </div>
      </motion.section>
    </div>
  );
}
