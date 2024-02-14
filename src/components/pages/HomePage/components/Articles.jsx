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
                Monday 05, September 2021 | By Author
              </div>
              <div className="name">
                This Article’s Title goes Here, but not too long.
              </div>
              <div className="likes">
                <div className="">
                  <img src="/landingImages/like.png" alt="like" />
                  <p>69</p>
                </div>
                <div className="">
                  <img src="/landingImages/view.png" alt="view" />
                  <p>69</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="image"></div>
            <div className="info">
              <div className="description">
                Monday 05, September 2021 | By Author
              </div>
              <div className="name">
                This Article’s Title goes Here, but not too long.
              </div>
              <div className="likes">
                <div className="">
                  <img src="/landingImages/like.png" alt="like" />
                  <p>69</p>
                </div>
                <div className="">
                  <img src="/landingImages/view.png" alt="view" />
                  <p>69</p>
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
                Monday 05, September 2021 | By Author
              </div>
              <div className="name">
                This Article’s Title goes Here, but not too long.
              </div>
              <div className="likes">
                <div className="">
                  <img src="/landingImages/like.png" alt="like" />
                  <p>69</p>
                </div>
                <div className="">
                  <img src="/landingImages/view.png" alt="view" />
                  <p>69</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="image"></div>
            <div className="info">
              <div className="description">
                Monday 05, September 2021 | By Author
              </div>
              <div className="name">
                This Article’s Title goes Here, but not too long.
              </div>
              <div className="likes">
                <div className="">
                  <img src="/landingImages/like.png" alt="like" />
                  <p>69</p>
                </div>
                <div className="">
                  <img src="/landingImages/view.png" alt="view" />
                  <p>69</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}