import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { apiInstance } from "../../../axios";
import LoadingSkeleton from "./LoadingSkeleton";
import AppointmentDetails from "./AppointmentDetails";
import Select from "react-select";
import debounce from "lodash.debounce";
import { FaFilter } from "react-icons/fa";
import { useTable } from "react-table";
import styled from "styled-components";
import NavUser from "../../navigation/NavUser/NavUser";

// Sample appointment statuses
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

  const columns = React.useMemo(
    () => [
      { Header: "Client Name", accessor: "clientName" },
      { Header: "Doctor Name", accessor: "doctorName" },
      // { Header: "Date", accessor: "date" },
      // { Header: "Time", accessor: "time" },
      { Header: "Status", accessor: "status" },
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data: appointments,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="user-appointments">
      <NavUser />
      {/* <h1>Your Requested Appointments</h1> */}

      <button
        className="filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter /> Filter
      </button>
      <div className={`filters ${showFilters ? "show" : ""}`}>
        <h3>Filter</h3>
        <label htmlFor="ClientName">Client Name :</label>
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
        <label htmlFor="StartDate">Start Date :</label>
        <input
          id="StartDate"
          type="datetime-local"
          name="StartDate"
          value={filters.StartDate}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <label htmlFor="EndDate">End Date :</label>
        <input
          id="EndDate"
          type="datetime-local"
          name="EndDate"
          value={filters.EndDate}
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />
        <div className="">
          <button className="reset-button" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => setSelectedAppointment(row.original.id)}
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  thead {
    background-color: var(--new-color);
  }

  tbody tr:hover {
    background-color: var(--fourth-color);
  }
`;
