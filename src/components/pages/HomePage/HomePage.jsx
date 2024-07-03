import React, { useEffect } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import { Doctors } from "./components/Doctors";
import { Articles } from "./components/Articles";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DepressionTest from "./components/DepressionTest";

const AnimatedSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <AnimatedSection delay={0.3}>
        <Services />
      </AnimatedSection>
      <AnimatedSection delay={0.4}>
        <DepressionTest />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Doctors />
      </AnimatedSection>
      <AnimatedSection delay={0.5}>
        <Articles />
      </AnimatedSection>
    </>
  );
};

export default HomePage;
