import React, { useState, useEffect, useCallback } from "react";
import { DoctorCard } from "./DoctorCard";
import { apiInstance } from "../../../axios";
import { useInView } from "react-intersection-observer";
import { useNavigate, useLocation } from "react-router-dom";
import useDoctorStore from "../../../hooks/use-doctor-store";
import { Slider } from "@mui/material";
import debounce from "lodash.debounce";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();
  const location = useLocation();

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const getFiltersFromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      name: searchParams.get("name") || "",
      specialization: searchParams.get("specialization") || "",
      gender: searchParams.get("gender") || "",
      city: searchParams.get("city") || "",
      minFees: parseInt(searchParams.get("minFees")) || 0,
      maxFees: parseInt(searchParams.get("maxFees")) || 1000,
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL);

  const fetchDoctors = useCallback(
    debounce(async (page, filters) => {
      setIsLoading(true);
      try {
        const response = await apiInstance.get(
          `/doctors?PageNumber=${page}&PageSize=${pageSize}&Name=${filters.name}&Specialization=${filters.specialization}&Gender=${filters.gender}&City=${filters.city}&MinFees=${filters.minFees}&MaxFees=${filters.maxFees}`
        );
        const newData = response.data;
        if (page === 1) {
          setDoctors(newData);
        } else {
          setDoctors((prev) => [...prev, ...newData]);
        }
        setHasMore(newData.length === pageSize);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
      setIsLoading(false);
    }, 1000),
    []
  );

  useEffect(() => {
    fetchDoctors(page, filters);
  }, [page, filters]);

  useEffect(() => {
    console.log(hasMore);
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, isLoading, inView]);

  useEffect(() => {
    const searchParams = new URLSearchParams(filters);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [filters, navigate, location.pathname]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeesChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minFees: newValue[0],
      maxFees: newValue[1],
    }));
  };

  return (
    <div className="doctors-list-container">
      <div className="filters">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={filters.specialization}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={filters.gender}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleFilterChange}
        />
        <div className="fees-filter">
          <Slider
            value={[filters.minFees, filters.maxFees]}
            onChange={handleFeesChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
          <div className="fees-inputs">
            <input
              type="number"
              name="minFees"
              placeholder="Min Fees"
              value={filters.minFees}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxFees"
              placeholder="Max Fees"
              value={filters.maxFees}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <div className="">
        {doctors.map((doctor) => (
          <div key={doctor.id}>
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="DoctorCardSkeleton-list">
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
