import React from "react";

import Container from "react-bootstrap/Container";

export function Scheduling() {
    return (
        <div
            className="container-fluid"
            style={{
                width: "100vw",
                marginLeft: "calc((100% - 100vw) / 2)",
                background: "linear-gradient(to top, #cae7ef, #ffffff)",
                padding: "120px",
                paddingTop: "0px",
            }}
        >
            <div
                className="hero-section"
                style={{
                    marginTop: "80px",
                }}
            >
                <div className="up-section">
                    <img
                        src={"/landingImages/meeting.png"}
                        alt="hero"
                        style={{
                            width: "45%",
                        }}
                    />
                    <div className="text">
                        <div className="text-up">
                            <h3
                                className="mb-5"
                                style={{
                                    fontSize: "4rem",
                                    fontWeight: 600,
                                }}
                            >
                                Schedule a Clinical Appointment
                            </h3>
                            <p
                                className="mt-3"
                                style={{
                                    fontSize: "1.2rem",
                                    color: "#0000008a",
                                }}
                            >
                                We’re proud to have a diverse team of
                                professionals specializing in various fields of
                                psychology. Our experts are here to provide you
                                with the support you need, when you need it.
                            </p>
                        </div>
                        <a href={"/signup"}>
                            <button
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    fontWeight: 700,
                                    fontSize: "1.2rem",
                                }}
                            >
                                <i class="bi bi-calendar-date me-2"></i>Schedule
                                Now
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
