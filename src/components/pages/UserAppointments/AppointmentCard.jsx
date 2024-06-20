import React from "react";

const AppointmentCard = ({ appointment, onClick }) => (
  <div
    className={`appointment-card ${appointment.status.toLowerCase()}`}
    onClick={() => onClick(appointment.id)}
  >
    <img src={appointment.clientPhotoUrl} alt={appointment.clientName} />
    <div>
      <h4>{appointment.clientName}</h4>
      <p>{formatDateTimeRange(appointment.startTime, appointment.endTime)}</p>
      <p>{appointment.status}</p>
    </div>
  </div>
);
const formatDateTimeRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end - start;
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  return `${diffMins} mins left`;
};
export default AppointmentCard;
