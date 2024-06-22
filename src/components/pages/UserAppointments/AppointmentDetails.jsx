import React, { useState } from "react";
import { apiInstance } from "../../../axios";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { formatDateTimeRange } from "./formatDateTimeRange";

const AppointmentDetails = ({ appointment, onClose }) => {
  const [reason, setReason] = useState("");
  const [isCancelable, setIsCancelable] = useState(
    appointment.status === "Confirmed" || appointment.status === "Pending"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleCancel = async () => {
    try {
      setIsLoading(true);
      const response = await apiInstance.put(
        `/appointments/${appointment.id}/cancel`,
        { reason }
      );
      if (response.status === 200) {
        appointment.status = "Cancelled";
        appointment.cancellationReason = reason;
        setIsCancelable(false);
        toast.success("Appointment cancelled successfully.");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Error cancelling appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="appointment-details-overlay" onClick={handleClose}></div>
      <div className="appointment-details">
        <button className="close-button" onClick={handleClose}>
          <AiOutlineClose />
        </button>
        <h2>{appointment.clientName}</h2>
        <p>{formatDateTimeRange(appointment.startTime, appointment.endTime)}</p>
        <p>Status: {appointment.status}</p>
        {isCancelable && (
          <div className="cancel-section">
            <label>Cancel Reason:</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
            />
            <button onClick={handleCancel} disabled={isLoading}>
              {isLoading ? "Loading..." : "Cancel"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AppointmentDetails;
