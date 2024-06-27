import React from "react";
import Container from "react-bootstrap/Container";

export default function Services() {
  return (
    <div
      className="container-fluid"
      style={{
        width: "100vw",
        marginLeft: "calc((100% - 100vw) / 2)",
        background: "white",
        padding: "100px",
        paddingTop: 0,
      }}
    >
      <section id="services" className="services">
        <h3
          className="mb-5"
          style={{
            fontSize: "4rem",
            fontWeight: "40px",
            letterSpacing: "-2px",
          }}
        >
          Services
        </h3>
        <div className="cards">
          <div className="card">
            <div className="image">
              <img
                src={"/landingImages/services-1.png"}
                width={50}
                height={50}
                alt="services"
              />
            </div>
            <h3>Online Community</h3>
            <p>
              Become part of a compassionate community that understands what
              you’re going through. Share your experiences, learn from others,
              and find comfort in knowing you’re not alone.
            </p>
          </div>
          <div className="card">
            <div className="image">
              <img
                src={"/landingImages/services-3.png"}
                width={50}
                height={50}
                alt="services"
              />
            </div>
            <h3 className="text-center">Resources and Articles</h3>
            <p>
              Unlock insights in psychology with 1000+ articles. From mental
              well-being to self-care tips, discover resources to enhance your
              understanding and empower your journey
            </p>
          </div>
          <div className="card">
            <div className="image">
              <img
                src={"/landingImages/services-2.png"}
                width={50}
                height={50}
                alt="services"
              />
            </div>
            <h3>Ask the Experts</h3>
            <p>
              Have your questions answered by licensed professionals. Our panel
              of experienced psychologists and therapists are here to provide
              guidance and advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
