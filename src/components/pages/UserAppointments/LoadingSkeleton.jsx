import React from "react";

const LoadingSkeleton = () => (
  <div className="DoctorCardSkeleton">
    <div className="skeleton-img"></div>
    <div className="skeleton-content">
      <div className="skeleton-line skeleton-line-short"></div>
      <div className="skeleton-line skeleton-line-long"></div>
      <div className="skeleton-line skeleton-end-line"></div>
    </div>
  </div>
);

export default LoadingSkeleton;
