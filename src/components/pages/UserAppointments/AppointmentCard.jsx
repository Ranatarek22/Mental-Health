import React from "react";
import { formatDateTimeRange } from "./formatDateTimeRange";

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

export default AppointmentCard;
