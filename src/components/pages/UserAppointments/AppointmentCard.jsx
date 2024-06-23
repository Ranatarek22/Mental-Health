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
      <h5>with dr.{appointment.doctorName}</h5>
      <p>{formatDateTimeRange(appointment.startTime, appointment.endTime)}</p>
      <p>
        status: <strong>{appointment.status}</strong>
      </p>
      <p>
        Fees: <strong>${appointment.fees}</strong>
      </p>
      <p>
        Locations: <strong>{appointment.location}</strong>
      </p>
    </div>
  </div>
);

export default AppointmentCard;
