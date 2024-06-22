// src/components/DoctorsList.js
import React, { useState, useEffect } from "react";
import { DoctorCard } from "./DoctorCard";
import { apiInstance } from "../../../axios";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import useDoctorStore from "../../../hooks/use-doctor-store";
import { Slider } from "@mui/material";

import NavUser from "../../navigation/NavUser/NavUser";
const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    specialization: "",
    gender: "",
    city: "",
    minFees: 0,
    maxFees: 1000,
  });
  const pageSize = 10;
  const addDoctor = useDoctorStore((state) => state.setDocs);

  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await apiInstance.get(
          `/doctors?PageNumber=${page}&PageSize=${pageSize}`
        );
        const newData = response.data;
        addDoctor(newData);
        setDoctors((prev) => [...prev, ...newData]);
        setFilteredDoctors((prev) => [...prev, ...newData]);
        setHasMore(newData.length === pageSize);
        console.log(doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
      setIsLoading(false);
    };
    fetchDoctors();
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, isLoading, inView]);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      return (
        (doctor.firstName?.toLowerCase() || "").includes(
          filters.name.toLowerCase()
        ) &&
        (doctor.specialization?.toLowerCase() || "").includes(
          filters.specialization.toLowerCase()
        ) &&
        (doctor.gender?.toLowerCase() || "").includes(
          filters.gender.toLowerCase()
        ) &&
        ((doctor.city?.toLowerCase() || "").includes(
          filters.city.toLowerCase()
        ) ||
          (doctor.location?.toLowerCase() || "").includes(
            filters.city.toLowerCase()
          )) &&
        doctor.sessionFees >= filters.minFees &&
        doctor.sessionFees <= filters.maxFees
      );
    });
    setFilteredDoctors(filtered);
  }, [filters, doctors]);

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
    <>
      <NavUser />

      <div className="doctors-list-container">
        <div className="filters">
          <h4>Filter</h4>
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
              className="Slider"
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
          {filteredDoctors.map((doctor) => (
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
    </>
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
