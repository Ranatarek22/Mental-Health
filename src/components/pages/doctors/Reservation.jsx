import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import { apiInstance } from "../../../axios";
import toast from "react-hot-toast";
import useDoctorStore from "../../../hooks/use-doctor-store";

const Reservation = () => {
  const { doctorId, startTime, duration } = useParams();
  const location = useLocation();

  const queryParams = queryString.parse(location.search);
  const getDoctor = useDoctorStore((state) => state.getDoctorById);
  const doctor=getDoctor(doctorId);
//   console.log(doctor.specialization);


  //   console.log(doctorId);

  const requestBody = {
    startTime: startTime,
    duration: duration,
    location: "string",
    reason: "string",
  };

  useEffect(() => {
    const bookAppointment = async () => {
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

    bookAppointment();
  }, [doctorId, startTime, duration, queryParams.location, queryParams.reason]);

  return (
    <div>

    </div>
  );
};

export default Reservation;
