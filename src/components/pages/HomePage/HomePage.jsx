import React from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import { Doctors } from "./components/Doctors";
import { Contact } from "./components/Contact";
import { Articles } from "./components/Articles";
import Footer from "./components/Footer";
const HomePage = () => {
  return (
    // <main className="w-100">
    <>
      <Hero />
      <Services />
      <Doctors />
      <Articles />
      <Contact />
      <Footer />
    </>
    // </main>
  );
};
export default HomePage;
