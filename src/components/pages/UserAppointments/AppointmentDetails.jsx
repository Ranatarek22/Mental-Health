import React, { useState } from "react";
import { apiInstance } from "../../../axios";

const AppointmentDetails = ({ appointment, onClose }) => {
  const [reason, setReason] = useState("");

  const handleCancel = async () => {
    await apiInstance.put(`/appointments/${appointment.id}/cancel`, { reason });
    onClose();
  };

  return (
    <div className="appointment-details">
      <h2>{appointment.clientName}</h2>
      <p>
        {appointment.startTime} - {appointment.endTime}
      </p>
      <p>Status: {appointment.status}</p>
      <div>
        <label>Cancel Reason:</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button onClick={handleCancel}>Cancel</button>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AppointmentDetails;
