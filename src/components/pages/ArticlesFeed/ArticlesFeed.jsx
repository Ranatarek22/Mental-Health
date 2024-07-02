import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { apiInstance } from "../../../axios";

const ArticlesFeed = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const { ref, inView } = useInView({ threshold: 1.0 });

  const fetchArticles = useCallback(async () => {
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
      setHasMore(newArticles.length === pageSize);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles, page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <div className="articles-feed">
      <h1 children="">Articles Feed</h1>
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
      {loading && <LoadingSkeleton />}
      <div ref={ref}></div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="loading-skeleton">
    {[...Array(10)].map((_, index) => (
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

export default ArticlesFeed;
