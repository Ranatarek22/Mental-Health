import React, { useState } from "react";
import moment from "moment";
import CustomWeekView from "./CustomWeekView";

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
