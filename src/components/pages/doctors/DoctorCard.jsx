import React from "react";
import DoctorSchedule from "./DoctorSchedule";
import { FaStethoscope, FaMoneyBillWave } from "react-icons/fa";
import Typography from "@mui/material/Typography";
// import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const DoctorCard = ({ doctor }) => {
  return (
    <>
      <div
        style={{
          flexDirection: "row",
          marginTop: "2%",
          marginBottom: "0%",
        }}
        className="doctor-card d-flex align-items-center justify-content-between "
      >
        <div className="p-2">
          <img
            src={doctor.photoUrl ? doctor.photoUrl : "/doctor.png"}
            alt={doctor.firstName}
            className="rounded-circle"
          />
        </div>

        <div className="pr-5 ms-4">
          <h4>
            {doctor.firstName} {doctor.lastName}
          </h4>
          <div style={{ fontSize: "20px" }}>
            <div className="d-flex align-items-center mb-2">
              <FaStethoscope className="me-2" color="pink" />
              <p className="mb-0">{doctor.specialization}</p>
            </div>
            <div className="d-flex align-items-center mb-2">
              <LocationOnIcon className="me-2" />
              <p className="mb-0">{doctor.location}</p>
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

            {/* <Typography component="legend">Rating</Typography>
            <Rating
              name="customized-color"
              defaultValue={2}
              getLabelText={(value) =>
                `${value} Heart${value !== 1 ? "s" : ""}`
              }
              precision={0.5}
              icon={<FavoriteIcon />}
              emptyIcon={<FavoriteBorderIcon />}
            /> */}
            {/* <Rating name="size-medium" defaultValue={2} /> */}
          </div>
        </div>
        <div style={{ width: "60%", flexDirection: "end" }}>
          <div className="d-flex justify-content-end text-center ">
            <DoctorSchedule doctorId={doctor.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
