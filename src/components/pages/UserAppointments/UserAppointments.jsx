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
    setAppointments((prev) => [...prev, ...response.data]);
    setLoading(false);
    setHasMore(appointments.length === pageSize);
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
      {appointments.length === 0 && <LoadingSkeleton />}
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onClick={(id) => setSelectedAppointment(id)}
        />
      ))}
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
