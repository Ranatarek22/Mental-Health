import React from "react";
import DoctorSchedule from "./DoctorSchedule";
import { FaStethoscope, FaMoneyBillWave } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
// import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const DoctorCard = ({ doctor }) => {
  const hasSchedule = doctor.weekDays;

  return (
    <>
      <div
        style={{
          flexDirection: "row",
          marginTop: "2%",
          marginBottom: "0%",
        }}
        className="doctor-card d-flex flex-wrap align-items-center justify-content-between"
      >
        <div className="p-2">
          <img
            src={
              doctor.photoUrl
                ? "/landingImages/Doctors/Doc6.png"
                : "/landingImages/Doctors/Doc6.png"
            }
            alt={doctor.firstName}
            className="rounded-circle"
          />
        </div>

        <div className="pr-5 ms-4 flex-grow-1">
          <div style={{ fontSize: "20px" }}>
            <div className="d-flex align-items-center mb-2">
              <h4>
                {doctor.firstName} {doctor.lastName}
              </h4>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaStethoscope className="me-2" color="pink" />
              <p className="mb-0">{doctor.specialization}</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <LocationOnIcon className="me-2" />
              <p className="mb-0">{doctor.city}</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaMoneyBillWave className="me-2 text-success" />
              <p className="mb-0">$ {doctor.sessionFees} </p>
            </div>
            <div>
              <p>{doctor.gender}</p>
            </div>
            <Rating name="size-medium" defaultValue={2} />
          </div>
        </div>
        <div className="flex-grow-1 d-flex justify-content-center text-center">
          <DoctorSchedule
            doctorId={doctor.id}
            doctorFirstName={doctor.firstName}
            doctorLastName={doctor.lastName}
          />
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
