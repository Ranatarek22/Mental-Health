import React, { useState, useEffect } from "react";
import { DoctorCard } from "./DoctorCard";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch(
        "https://nexus-api-h3ik.onrender.com/api/doctors/e767b5a8-ffa3-4cab-bc3e-00dab1e30fca",
        {
          method: "GET",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJlNzY3YjVhOC1mZmEzLTRjYWItYmMzZS0wMGRhYjFlMzBmY2EiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImU3NjdiNWE4LWZmYTMtNGNhYi1iYzNlLTAwZGFiMWUzMGZjYSIsImVtYWlsIjoiZG9jdG9yQGV4YW1wbGUuY29tIiwibmFtZSI6IlN0ZXZlbiBDaGFybGVzIiwicGhvdG9VcmwiOiJodHRwOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RsdDBlMDllNy9pbWFnZS91cGxvYWQvdjE3MTg2NDY1MzIvdGd0aWZuMjFxMzl5cWx6eGJ4ZGUucG5nIiwianRpIjoiZG9jdG9yQGV4YW1wbGUuY29tIiwicm9sZXMiOiJEb2N0b3IiLCJleHAiOjE3MjEyNTk1NjAsImlzcyI6Imh0dHBzOi8vbmV4dXMtYXBpLWgzaWsub25yZW5kZXIuY29tIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzIzNSJ9.g2r715IFyGrebq29UHBFgB96Ezfj0qynLfhn4lSExgc",
          },
        }
      );
      const data = await response.json();
      setDoctors(data);
    };
    fetchDoctors();
    console.log(doctors);
  }, []);

  return (
    <div className="doctors-list">
      {/* {doctors.map((doctor) => ( */}
      <DoctorCard key={doctors.id} doctor={doctors} />
      {/* ))} */}
    </div>
  );
};

export default DoctorsList;
