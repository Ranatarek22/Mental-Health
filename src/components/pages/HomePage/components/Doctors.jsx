import React from "react";
import Container from "react-bootstrap/Container";

export function Doctors() {
  return (
    <Container className="w-100">
      <section id="doctors" className="doctors">
        <div className="heading">
          <h4>Trusted Care</h4>
          <h1>Our Doctors</h1>
        </div>
        <div className="cards">
          <div className="card">
            <div className="image"></div>
            <div className="name">
              <h3>Doctor’s Name</h3>
              <h2>Neurology</h2>
            </div>

            <div className="social">
              <div className="">
                <img src="/landingImages/facebook.png" alt="facebook" />
              </div>
              <div className="">
                <img src="/landingImages/linkedin.png" alt="linkedin" />
              </div>
              <div className="">
                <img src="/landingImages/instagram.png" alt="facebook" />
              </div>
            </div>
            <div className="footer">View Profile</div>
          </div>
          <div className="card">
            <div className="image"></div>
            <div className="name">
              <h3>Doctor’s Name</h3>
              <h2>Neurology</h2>
            </div>

            <div className="social">
              <div className="">
                <img src="/landingImages/facebook.png" alt="facebook" />
              </div>
              <div className="">
                <img src="/landingImages/linkedin.png" alt="linkedin" />
              </div>
              <div className="">
                <img src="/landingImages/instagram.png" alt="facebook" />
              </div>
            </div>
            <div className="footer">View Profile</div>
          </div>
          <div className="card">
            <div className="image"></div>
            <div className="name">
              <h3>Doctor’s Name</h3>
              <h2>Neurology</h2>
            </div>

            <div className="social">
              <div className="">
                <img src="/landingImages/facebook.png" alt="facebook" />
              </div>
              <div className="">
                <img src="/landingImages/linkedin.png" alt="linkedin" />
              </div>
              <div className="">
                <img src="/landingImages/instagram.png" alt="facebook" />
              </div>
            </div>
            <div className="footer">View Profile</div>
          </div>
        </div>
      </section>
    </Container>
  );
}