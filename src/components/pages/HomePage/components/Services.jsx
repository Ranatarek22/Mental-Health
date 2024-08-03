import React from "react";
import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { useInView } from "react-intersection-observer";

const fadeIn = (
  direction = "left",
  type = "spring",
  delay = 0,
  duration = 1
) => ({
  initial: {
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    opacity: 0,
  },
  animate: {
    x: 0,
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

const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={fadeIn("left", "spring", delay, 0.75)}
    >
      {children}
    </motion.div>
  );
};

const ServiceCard = ({ icon, title, description, delay }) => (
  <Tilt
    options={{
      max: 45,
      scale: 1,
      speed: 450,
    }}
    className="bg-tertiary rounded-2xl sm:w-[360px] w-full"
  >
    <AnimatedSection delay={delay}>
      <div className="card">
        <div className="image">
          <img src={icon} width={50} height={50} alt="services" />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </AnimatedSection>
  </Tilt>
);

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
        initial="initial"
        animate="animate"
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
          <ServiceCard
            icon="icon1.png"
            title="Online Community"
            description="Become part of a compassionate community that understands what you’re going through. Share your experiences, learn from others, and find comfort in knowing you’re not alone."
            delay={0.5}
          />
          <ServiceCard
            icon="icon.png"
            title="Resources and Articles"
            description="Unlock insights in psychology with 1000+ articles. From mental well-being to self-care tips, discover resources to enhance your understanding and empower your journey."
            delay={1}
          />
          <ServiceCard
            icon="icon1.png"
            title="Ask the Experts"
            description="Have your questions answered by licensed professionals. Our panel of experienced psychologists and therapists are here to provide guidance and advice."
            delay={1.5}
          />
        </div>
      </motion.section>
    </div>
  );
}
