import React from "react";
import Container from "react-bootstrap/Container";

export default function Services() {
  return (
    <Container className="w-100">
      <section id="services" className="services">
        <h1>
          Our services made <br /> for you?
        </h1>
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
              Welcome to our thriving Online Community! Connect with like-minded
              individuals, share experiences, and support one another on your
              journey.
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
            <h3>Discover 1000+ article</h3>
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
            <h3>Reach 100+ doctors</h3>
            <p>
              Access superior healthcare with 100+ expert doctors. Our diverse
              team offers personalized care, ensuring you receive the best
              medical expertise for your well-being.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
