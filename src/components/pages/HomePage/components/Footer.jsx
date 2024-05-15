import React from "react";
import Container from "react-bootstrap/Container";

function Footer() {
    return (
        <div
            className="container-fluid"
            style={{
                width: "100vw",
                marginLeft: "calc((100% - 100vw) / 2)",
                backgroundImage: "url('/landingImages/d.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
            }}
        >
            <div className="footer">
                <footer>
                    <div className="info">
                        <div className="footer-logo "></div>
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
                    <div className="rights text-dark">
                        <p>© 2024 Nexus All Rights Reserved</p>
                        <div className="social">
                            <div className="social">
                                <div className="">
                                    <img
                                        src="/landingImages/facebook.png"
                                        alt="facebook"
                                    />
                                </div>
                                <div className="">
                                    <img
                                        src="/landingImages/linkedin.png"
                                        alt="linkedin"
                                    />
                                </div>
                                <div className="">
                                    <img
                                        src="/landingImages/instagram.png"
                                        alt="facebook"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;
