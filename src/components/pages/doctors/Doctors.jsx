import React, { useState, useEffect } from "react";
import { DoctorCard } from "./DoctorCard";
import { apiInstance } from "../../../axios";
import { useInView } from "react-intersection-observer";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { ref, inView } = useInView({
    threshold: 1.0,
  });
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      const response = await apiInstance.get(
        `/doctors?PageNumber=${page}&PageSize=${pageSize}`
      );
      const newData = response.data;
      setDoctors((prev) => [...prev, ...newData]);
      setHasMore(newData.length === pageSize);
      setIsLoading(false);
    };
    fetchDoctors();
    console.log(doctors);
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, isLoading, inView]);
  return (
    <div className="doctors-list">
      <h1>our Professions Doctors</h1>
      {doctors.map((doctor) => (
        <DoctorCard key={doctors.id} doctor={doctor} />
      ))}
      {isLoading && (
        <div className="DoctorCardSkeleton-list ">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
            <DoctorCardSkeleton key={idx} />
          ))}
        </div>
      )}
      <div ref={ref} />
    </div>
  );
};

export default DoctorsList;

const DoctorCardSkeleton = () => {
  return (
    <div className="DoctorCardSkeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-line-short"></div>
        <div className="skeleton-line skeleton-line-long"></div>
        <div className="skeleton-line skeleton-end-line"></div>
      </div>
    </div>
  );
};