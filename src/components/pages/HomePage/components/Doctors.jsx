import React from "react";
import Container from "react-bootstrap/Container";

export function Doctors() {
    return (
        <Container className="w-100">
            <section id="doctors" className="doctors">
                <h3
                    style={{
                        fontSize: "4rem",
                        fontWeight: 300,
                        color: "",
                    }}
                >
                    Our Top Rated Experts
                </h3>
                <div className="cards">
                    <div className="card">
                        <div className="image"></div>
                        <div className="name">
                            <h3>Dr. Ali Ahmed</h3>
                            <h2>Psychotherapy</h2>
                        </div>

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
                    <div className="card">
                        <div className="image"></div>
                        <div className="name">
                            <h3>Dr. Sara Ali</h3>
                            <h2>Neurology</h2>
                        </div>

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
                    <div className="card">
                        <div className="image"></div>
                        <div className="name">
                            <h3>Dr.Alaa</h3>
                            <h2>Psychiatry</h2>
                        </div>

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
            </section>
        </Container>
    );
}
