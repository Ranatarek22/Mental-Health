import React from "react";
import { useState, useEffect } from "react";
import { apiInstance } from "../../../../axios";
import { useNavigate } from "react-router-dom";

export function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 2;
  const page = 1;

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await apiInstance.get("/articles", {
        params: {
          Query:
            " psychology OR Neuroscience OR Therapy OR Mental health OR Medical research OR Clinical psychology",
          PageSize: pageSize,
          Page: page,
        },
      });
      const newArticles = response.data.articles;
      setArticles((prev) =>
        page === 1 ? newArticles : [...prev, ...newArticles]
      );
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div id="articles" className="articles-feed">
      <h1 children="">Articles Feed</h1>
      <div className="holder">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="article-image"
            />
            <div className="article-content">
              <h2 className="article-title">{article.title}</h2>
              <p className="article-description">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="article-link"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
      {loading && <LoadingSkeleton />}
      <a href="/articles">
        <button>See More</button>
      </a>
    </div>
  );
}
const LoadingSkeleton = () => (
  <div className="loading-skeleton">
    {[...Array(2)].map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-description"></div>
          <div className="skeleton-link"></div>
        </div>
      </div>
    ))}
  </div>
);
