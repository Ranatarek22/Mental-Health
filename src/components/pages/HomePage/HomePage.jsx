import React from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import { Doctors } from "./components/Doctors";
import { Contact } from "./components/Contact";
import { Articles } from "./components/Articles";
import { Welcome } from "./components/Welcome";
import { Scheduling } from "./components/Scheduling";
import { Communication } from "./components/Communication";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import MentalHealthTest from "../MentalHealthTest/MentalHealthTest";

const HomePage = () => {
  return (
    // <main className="w-100">
    <>
      <Hero />
      {/* <Welcome /> */}
      {/* <Communication /> */}
      <Scheduling />
      <Services />
      <Doctors />
      <MentalHealthTest />
      <Articles />
      {/* <Contact /> */}
      <Footer />
    </>
    // </main>
  );
};
export default HomePage;
