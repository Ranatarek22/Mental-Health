import React from "react";
import Container from "react-bootstrap/Container";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid"
      style={{
        width: "100vw",
        marginLeft: "calc((100% - 100vw) / 2)",
        backgroundColor: "#282c34",
        color: "white",
        padding: "40px 0",
      }}
    >
      <Container>
        <div className="footer">
          <footer>
            <div className="info row">
              <div className="footer-logo col-md-4 mb-4">
                {/* <h2 style={{ color: "var(--primary-color)" }}>Nexus</h2> */}
                <img
                  src="/logooo.png"
                  srcSet="/logooo.png"
                  className="m-2"
                  style={{ width: "100px", height: "33px" }}
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="footer-links col-md-4 mb-4">
                <h3>Important Links</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>Meetings</li>
                  <li>Doctors</li>
                  <li>Services</li>
                  <li>About Us</li>
                </ul>
              </div>
              <div className="footer-contact col-md-4 mb-4">
                <h3>Contact Us</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>Call: (237) 681-812-255</li>
                  <li>Email: fildineesoe@gmail.com</li>
                  <li>Address: 0123 Some place, Some country</li>
                </ul>
              </div>
            </div>
            <hr style={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
            <div className="rights text-center mt-4">
              <p>© 2024 Nexus. All Rights Reserved.</p>
              <div className="social">
                <FaFacebook size={24} style={{ margin: "0 10px" }} />
                <FaLinkedin size={24} style={{ margin: "0 10px" }} />
                <FaInstagram size={24} style={{ margin: "0 10px" }} />
              </div>
            </div>
          </footer>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
