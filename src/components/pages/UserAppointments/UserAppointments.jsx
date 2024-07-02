import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { apiInstance } from "../../../axios";
import LoadingSkeleton from "./LoadingSkeleton";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetails from "./AppointmentDetails";
import { Slider } from "@mui/material";
import Select from "react-select";
import debounce from "lodash.debounce";
import { FaFilter } from "react-icons/fa";

const appointmentStatuses = [
  { value: "", label: "All" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Pending", label: "Pending" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Rejected", label: "Rejected" },
];

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { ref, inView } = useInView({ threshold: 1.0 });
  const navigate = useNavigate();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const getFiltersFromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      ClientName: searchParams.get("ClientName") || "",
      DoctorName: searchParams.get("DoctorName") || "",
      StartDate: searchParams.get("StartDate") || "",
      EndDate: searchParams.get("EndDate") || "",
      Status: searchParams.get("Status") || "",
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL);

  const fetchAppointments = useCallback(
    debounce(async (page, filters) => {
      setLoading(true);
      const response = await apiInstance.get(`/appointments/clients/me`, {
        params: { PageNumber: page, PageSize: pageSize, ...filters },
      });
      const newData = response.data;
      setAppointments((prev) => (page === 1 ? newData : [...prev, ...newData]));
      setHasMore(newData.length === pageSize);
      setLoading(false);
    }, 1000),
    []
  );

  useEffect(() => {
    fetchAppointments(1, filters);
  }, [filters]);
  useEffect(() => {
    fetchAppointments(page, filters);
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (filters.ClientName) searchParams.set("ClientName", filters.ClientName);
    if (filters.DoctorName) searchParams.set("DoctorName", filters.DoctorName);
    if (filters.StartDate) searchParams.set("StartDate", filters.StartDate);
    if (filters.EndDate) searchParams.set("EndDate", filters.EndDate);
    if (filters.Status) searchParams.set("Status", filters.Status);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [filters, navigate, location.pathname]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      location: "",
      minFees: 0,
      maxFees: 1000,
    });
  };
  return (
    <div className="user-appointments">
      <h1>Your Requested Appointments</h1>

      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter /> Filter
      </button>
      <div className={`filters ${showFilters ? "show" : ""}`}>
        <h3>Filter</h3>
        <label htmlFor="name">Client Name :</label>
        <input
          id="ClientName"
          type="text"
          name="ClientName"
          placeholder="Client Name"
          value={filters.ClientName}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="DoctorName">Doctor Name :</label>
        <input
          id="DoctorName"
          type="text"
          name="DoctorName"
          placeholder="Doctor Name"
          value={filters.DoctorName}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="status">Status :</label>
        <Select
          name="Status"
          options={appointmentStatuses}
          placeholder="Status"
          value={appointmentStatuses.find(
            (option) => option.value === filters.Status
          )}
          onChange={(option) =>
            handleFilterChange("Status", option ? option.value : "")
          }
        />
        <label htmlFor="StartTime">Start Time :</label>
        <input
          id="StartTime"
          type="datetime-local"
          name="StartTime"
          value={filters.StartTime}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="EndTime">End Time :</label>
        <input
          id="EndTime"
          type="datetime-local"
          name="EndTime"
          value={filters.EndTime}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <div className="">
          <button className="reset-button" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onClick={() => setSelectedAppointment(appointment.id)}
        />
      ))}
      {loading && (
        <div className="DoctorCardSkeleton-list">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
            <LoadingSkeleton key={idx} />
          ))}
        </div>
      )}
      <div ref={ref} />
      {selectedAppointment && (
        <AppointmentDetails
          appointment={appointments.find(
            (appt) => appt.id === selectedAppointment
          )}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
};

export default UserAppointments;
