import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Modal, Button, ListGroup, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { apiInstance } from "../../../axios";

const CustomDay = ({
  date,
  formattedDate,
  doctorId,
  startOfDayTime,
  endOfDayTime,
  sessionDuration,
  appointments,
  doctorFirstName,
  doctorLastName,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const fetchSlots = async () => {
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      console.log(
        `Fetching slots for doctor ID: ${doctorId} on date: ${formattedDate}`
      );

      const response = await apiInstance.get(`/doctors/${doctorId}/slots`, {
        params: { dateTime: formattedDate },
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

  const handleClose = () => {
    setShowModal(false);
    setShowConfirmModal(false);
    setShowSuccessModal(false);
  };

  const handleBook = (slot) => {
    setSelectedSlot(slot);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const startTime = moment(`${formattedDate}T${selectedSlot}`).utc().format();

    const requestBody = {
      startTime: startTime,
      duration: sessionDuration,
      location: "string",
      reason: reason,
    };

    try {
      const response = await apiInstance.post(
        `/appointments?doctorId=${doctorId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Appointment booked successfully:", response.data);
      toast.success("Appointment booked successfully");
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error booking appointment:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      toast.error("Failed to book appointment");
    }
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
            <strong>From</strong>
            {startOfDayTime
              ? moment(startOfDayTime, "HH:mm:ss").format("HH:mm")
              : "N/A"}
          </div>
          <div
            className="event-slot"
            style={{ backgroundColor: "var(--third-color)" }}
          >
            <strong>To</strong>
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
                    onClick={() => handleBook(slot)}
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

      <Modal show={showConfirmModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="reason">
            <Form.Label>Reason (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Group>
          <p>
            Are you sure you want to reserve an appointment with Doctor{" "}
            {doctorFirstName} {doctorLastName} on {formattedDate} at{" "}
            {selectedSlot}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "var(--third-color)", border: "none" }}
            onClick={handleConfirm}
          >
            OK
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Booked</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Appointment with Doctor {doctorFirstName} {doctorLastName} on{" "}
            {formattedDate} at {selectedSlot} has been booked successfully.
          </p>
          {reason && <p>Reason: {reason}</p>}
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
