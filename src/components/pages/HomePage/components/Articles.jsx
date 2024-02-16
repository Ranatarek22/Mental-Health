import React from "react";
import Container from "react-bootstrap/Container";

export function Articles() {
  return (
    <Container className="w-100">
      <section id="articles" className="articles">
        <div className="heading">
          <h4>Better information, Better health</h4>
          <h1>Articles</h1>
        </div>
        <div className="cards">
          <div className="card">
            <div className="image"></div>
            <div className="info">
              <div className="description">
                Sunday 01, September 2021 | By Dr.Mohamed
              </div>
              <div className="name">
                Mind Matters: Navigating Mental Health Challenges with
                Resilience
              </div>
              <div className="likes">
                <div className="">
                  <img src="/landingImages/like.png" alt="like" />
                  <p>60</p>
                </div>
                <div className="">
                  <img src="/landingImages/view.png" alt="view" />
                  <p>269</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="image"></div>
            <div className="info">
              <div className="description">
                Monday 05, September 2023 | By Dr.Ali
              </div>
              <div className="name">
                Unlocking Inner Peace: Exploring Mental Wellness Strategies
              </div>
              <div className="likes">
                <div className="">
                  <img src="/landingImages/like.png" alt="like" />
                  <p>19</p>
                </div>
                <div className="">
                  <img src="/landingImages/view.png" alt="view" />
                  <p>169</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div className="image"></div>
            <div className="info">
              <div className="description">
                Friday 15, March 2023 | By Dr.Sara
              </div>
              <div className="name">
                Breaking the Stigma: Understanding Mental Health in Today's
                World
              </div>
              <div className="likes">
                <div className="">
                  <img src="/landingImages/like.png" alt="like" />
                  <p>39</p>
                </div>
                <div className="">
                  <img src="/landingImages/view.png" alt="view" />
                  <p>289</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="image"></div>
            <div className="info">
              <div className="description">
                Monday 15, September 2023 | By Dr.Alaa
              </div>
              <div className="name">
                Embracing Balance: Cultivating Mental Wellbeing in Everyday Life
              </div>
              <div className="likes">
                <div className="">
                  <img src="/landingImages/like.png" alt="like" />
                  <p>88</p>
                </div>
                <div className="">
                  <img src="/landingImages/view.png" alt="view" />
                  <p>469</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
