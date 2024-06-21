import React from "react";
import NavUser from "../../navigation/NavUser/NavUser";
import DoctorSchedule from "./DoctorSchedule";
import { FaStethoscope, FaMoneyBillWave } from "react-icons/fa";

export const DoctorCard = ({ doctor }) => {
  return (
    <>
      <NavUser />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "8%",
          marginBottom: "4%",
        }}
        className="doctor-card"
      >
        <div style={{ flex: "1" }}>
          <img
            src={doctor.photoUrl ? doctor.photoUrl : "/doctor.png"}
            alt={doctor.firstName}
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>

        <div style={{ flex: "4", marginLeft: "20px" }}>
          <h4>
            {doctor.firstName} {doctor.lastName}
          </h4>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaStethoscope style={{ marginRight: "5px" }} />
            <p style={{ margin: "0", marginRight: "10px" }}>
              {doctor.specialization}
            </p>
          </div>
          <p>
            <strong>Location:</strong> 7 st warraq arrab
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaMoneyBillWave style={{ marginRight: "5px" }} />
            <p style={{ margin: "0" }}>
              <strong>Fees:</strong> $100
            </p>
          </div>
          <p>
            <strong>Gender:</strong> {doctor.gender}
          </p>
        </div>

        <div style={{ flex: "2", textAlign: "center", width: "40%" }}>
          <DoctorSchedule doctorId={doctor.id} />
        </div>
      </div>
    </>
  );
};
