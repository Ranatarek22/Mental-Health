import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { apiInstance } from "../../../axios";
import LoadingSkeleton from "./LoadingSkeleton";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetails from "./AppointmentDetails";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { ref, inView } = useInView({ threshold: 1.0 });

  const fetchAppointments = async () => {
    setLoading(true);
    const response = await apiInstance.get(
      `/appointments/clients/me?PageNumber=${page}&PageSize=${pageSize}`
    );
    const newData = response.data;
    console.log(newData);
    setAppointments((prev) => [...prev, ...newData]);
    setHasMore(newData.length === pageSize);
    setLoading(false);
  };
  useEffect(() => {
    fetchAppointments(page);
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <div className="user-appointments">
      <h1>Your Requested Appointments</h1>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onClick={(id) => setSelectedAppointment(id)}
        />
      ))}
      {loading && (
        <div className="DoctorCardSkeleton-list ">
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
