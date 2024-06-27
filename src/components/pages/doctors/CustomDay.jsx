import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { apiInstance } from "../../../axios";

const CustomDay = ({
  date,
  formattedDate,
  doctorId,
  startOfDayTime,
  endOfDayTime,
  sessionDuration,
  appointments,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  const fetchSlots = async () => {
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      console.log(
        `Fetching slots for doctor ID: ${doctorId} on date: ${formattedDate}`
      );

      const response = await apiInstance.get(`/doctors/${doctorId}/slots`, {
        params: { date: formattedDate },
      });
      console.log(formattedDate);
      console.log(doctorId);
      console.log("API response:", response.data);
      setSlots(response.data || []);
    } catch (error) {
      console.error("Error fetching slots:", error.response || error.message);
    }
  };

  const reserveNavigation = async () => {
    await fetchSlots();
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleConfirm = (slot) => {
    setShowModal(false);
    navigate(`/reserve/${doctorId}/${slot}`);
  };

  return (
    <>
      <div className="day-card" style={{ color: "var(--third-color)" }}>
        <div className="day-header">
          <span style={{ color: "var(--third-color)" }}>{formattedDate}</span>
        </div>
        <div className="event-slots">
          <div
            className="event-slot"
            style={{ backgroundColor: "var(--third-color)" }}
          >
            <strong>From</strong>{" "}
            {startOfDayTime
              ? moment(startOfDayTime, "HH:mm:ss").format("HH:mm")
              : "N/A"}
          </div>
          <div
            className="event-slot"
            style={{ backgroundColor: "var(--third-color)" }}
          >
            <strong>To</strong>{" "}
            {endOfDayTime
              ? moment(endOfDayTime, "HH:mm:ss").format("HH:mm")
              : "N/A"}
          </div>
        </div>
        <button className="book-button" onClick={reserveNavigation}>
          Book
        </button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose an Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Available slots on {formattedDate}:</p>
          <ListGroup>
            {slots.length > 0 ? (
              slots.map((slot, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  {slot}
                  <Button
                    style={{ backgroundColor: "pink", border: "none" }}
                    onClick={() => handleConfirm(slot)}
                  >
                    Book
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <p>No slots available</p>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "var(--third-color)", border: "none" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomDay;
