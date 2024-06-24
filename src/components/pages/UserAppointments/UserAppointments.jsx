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

  const appointmentStatuses = [
    { value: "", label: "All" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Pending", label: "Pending" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Rejected", label: "Rejected" },
  ];

  const locations = [
    { value: "", label: "All" },
    { value: "Cairo", label: "Cairo" },
    { value: "Alexandria", label: "Alexandria" },
    { value: "Giza", label: "Giza" },
    { value: "Port Said", label: "Port Said" },
    // Add other locations as needed
  ];

  const getFiltersFromURL = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      status: searchParams.get("status") || "",
      location: searchParams.get("location") || "",
      minFees: parseInt(searchParams.get("minFees")) || 0,
      maxFees: parseInt(searchParams.get("maxFees")) || 1000,
    };
  };

  const [filters, setFilters] = useState(getFiltersFromURL);

  const fetchAppointments = useCallback(
    debounce(async (page, filters) => {
      setLoading(true);
      const response = await apiInstance.get(
        `/appointments/clients/me?PageNumber=${page}&PageSize=${pageSize}&Status=${filters.status}&Location=${filters.location}&MinFees=${filters.minFees}&MaxFees=${filters.maxFees}`
      );
      const newData = response.data;
      setAppointments((prev) => (page === 1 ? newData : [...prev, ...newData]));
      setHasMore(newData.length === pageSize);
      setLoading(false);
    }, 1000),
    []
  );

  useEffect(() => {
    fetchAppointments(page, filters);
  }, [page, filters]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  useEffect(() => {
    const searchParams = new URLSearchParams(filters);
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [filters, navigate, location.pathname]);

  const handleFilterChange = (selectedOption, actionMeta) => {
    setFilters((prev) => ({
      ...prev,
      [actionMeta.name]: selectedOption.value,
    }));
  };

  const handleFeesChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      minFees: newValue[0],
      maxFees: newValue[1],
    }));
  };
  const resetFilters = () => {
    setFilters({
      status: "",
      location: "",
      minFees: 0,
      maxFees: 1000,
    });
    // navigate("/appointments", { replace: true });
  };
  return (
    <div className="user-appointments">
      <h1>Your Requested Appointments</h1>
      <div className="user-appointments-filters">
        <h4>Filter</h4>
        <div className="holder-filter">
          <label htmlFor="status">location</label>
          <Select
            name="status"
            options={appointmentStatuses}
            placeholder="Status"
            value={appointmentStatuses.find(
              (option) => option.value === filters.status
            )}
            onChange={handleFilterChange}
          />
        </div>
        <div className="holder-filter">
          <label htmlFor="location">location</label>
          <Select
            id="location"
            name="location"
            options={locations}
            placeholder="Location"
            value={locations.find(
              (option) => option.value === filters.location
            )}
            onChange={handleFilterChange}
          />
        </div>
        <div className="fees-filter">
          <label htmlFor="fees">Fees</label>
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
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minFees: parseInt(e.target.value),
                }))
              }
            />
            <input
              type="number"
              name="maxFees"
              placeholder="Max Fees"
              value={filters.maxFees}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxFees: parseInt(e.target.value),
                }))
              }
            />
          </div>
        </div>
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
