import React, { useState, useEffect } from "react";
import moment from "moment";
import CustomWeekView from "./CustomWeekView";
import { apiInstance } from "../../../axios";

const DoctorSchedule = ({ doctorId }) => {
  const [currentDate, setCurrentDate] = useState(
    moment().startOf("week").toDate()
  );

  return (
    <div className="doctor-schedule">
      <CustomWeekView date={currentDate} doctorId={doctorId} />
    </div>
  );
};

export default DoctorSchedule;
