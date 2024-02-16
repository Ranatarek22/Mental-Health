import React from "react";
import Container from "react-bootstrap/Container";

function Hero() {
  return (
    <Container className="w-100">
      <div className="hero-section">
        <div className="up-section">
          <div className="text">
            <div className="text-up">
              <h2 className="">Caring for Life</h2>
              <p className="">
                Leading the Way <br /> in Medical Excellence
              </p>
            </div>
            <a href={"/signup"}>
              <button style={{ width: "100%" }}>Get Started</button>
            </a>
          </div>
          <img src={"/landingImages/hero.png"} alt="hero" />
        </div>
        <div className="down-section">
          <div className="hero-card">
            <p className="text-white text-xl font-semibold">Attend meeting</p>
            <img
              src={"/landingImages/calender.png"}
              alt=""
              width={60}
              height={60}
            />
          </div>
          <div className="hero-card">
            <p className="text-white text-xl font-semibold">Find a doctor</p>
            <img
              src={"/landingImages/doctors.png"}
              alt=""
              width={60}
              height={60}
            />
          </div>
          <div className="hero-card">
            <p className="text-white text-xl font-semibold">Depression Test</p>
            <img
              src={"/landingImages/brain.png"}
              alt=""
              width={60}
              height={60}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Hero;
