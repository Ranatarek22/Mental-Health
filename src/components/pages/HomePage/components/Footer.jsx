import React from "react";
import Container from "react-bootstrap/Container";

function Footer() {
  return (
    <div className="footer">
      <Container className="w-100">
        <footer>
          <div className="info">
            <div className="footer-logo">
              <h1>MENTAL</h1>
              <p>Leading the Way in Medical Execellence, Trusted Care.</p>
            </div>
            <div className="footer-links">
              <h1>Important Links</h1>
              <div className="">
                <p>Meetings</p>
                <p>Doctors</p>
                <p>Services</p>
                <p>About Us</p>
              </div>
            </div>
            <div className="footer-contact">
              <h1>Contact Us</h1>
              <div className="">
                <p>Call: (237) 681-812-255</p>
                <p>Email: fildineesoe@gmail.com</p>
                <p>Address: 0123 Some place</p>
                <p>Some country</p>
              </div>
            </div>
          </div>
          <span />
          <div className="rights">
            <p>© 2021 Hospital’s name All Rights Reserved by PNTEC-LTD</p>
            <div className="social">
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
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
}

export default Footer;
