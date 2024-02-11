import React from "react";
import Container from "react-bootstrap/Container";

export function Contact() {
  return (
    <Container className="w-100">
      <section id="contact" className="contact">
        <div className="heading">
          <h4>Get in touch</h4>
          <h1>Contact</h1>
        </div>
        <div className="cards">
          <div className="card">
            <div className="image">
              <img
                src={"/landingImages/phone.png"}
                width={50}
                height={50}
                alt="services"
              />
            </div>
            <h3>Emergency</h3>
            <div className="">
              <p>(237) 666-331-894</p>
              <p>(237) 681-812-255</p>
            </div>
          </div>
          <div className="card">
            <div className="image">
              <img
                src={"/landingImages/location.png"}
                width={50}
                height={50}
                alt="services"
              />
            </div>
            <h3>Location</h3>
            <div className="">
              <p>0123 Some place</p>
              <p>9876 Some country</p>
            </div>
          </div>
          <div className="card">
            <div className="image">
              <img
                src={"/landingImages/mail.png"}
                width={50}
                height={50}
                alt="services"
              />
            </div>
            <h3>Mail</h3>
            <div className="">
              <p>fildineeesoe@gmil.com</p>
              <p>myebstudios@gmail.com</p>
            </div>
          </div>
          <div className="card">
            <div className="image">
              <img
                src={"/landingImages/time.png"}
                width={50}
                height={50}
                alt="services"
              />
            </div>
            <h3>Working Hours</h3>
            <div className="">
              <p>Mon-Sat 09:00-20:00</p>
              <p>Sunday Emergency only</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
