import React, { useState, useEffect } from "react";
import moment from "moment";
import CustomDay from "./CustomDay";
import { apiInstance } from "../../../axios";

const CustomWeekView = ({
  doctorId,
  appointments,
  doctorLastName,
  doctorFirstName,
}) => {
  const [displayedDays, setDisplayedDays] = useState([]);
  const [formattedDates, setFormattedDates] = useState({});
  const [weeksAhead, setWeeksAhead] = useState(0); //Keeps track of how many weeks ahead are currently displayed. two weeks three weeks
  const [weekDays, setWeekDays] = useState([]); //Stores the weekdays on which the doctor is available. tuesday
  const DAYS_PER_LOAD = 3;

  useEffect(() => {
    fetchDoctorSchedule();
  }, []);

  useEffect(() => {
    if (weekDays.length > 0) {
      updateDisplayedDaysAndEvents();
    }
  }, [weeksAhead, weekDays]);

  const fetchDoctorSchedule = async () => {
    try {
      const response = await apiInstance.get(`/doctors/${doctorId}/schedule`);
      const { weekDays } = response.data;
      // console.log(doctorId);

      if (weekDays.length === 0) {
        throw new Error("No weekDays data found");
      }

      setWeekDays(weekDays);
      updateDisplayedDaysAndEvents(weekDays, 0, DAYS_PER_LOAD);
    } catch (error) {
      console.error("Error fetching doctor schedule:", error);
    }
  };

  const updateDisplayedDaysAndEvents = (
    weekDaysData = weekDays,
    startWeek = weeksAhead
  ) => {
    const newDays = calculateDates(
      weekDaysData,
      startWeek,

      displayedDays
    );

    const updatedDays = [...displayedDays, ...newDays].sort((a, b) =>
      a.isBefore(b) ? -1 : 1
    );

    setDisplayedDays(updatedDays);
    setFormattedDates((prevFormatted) => ({
      ...prevFormatted,
      ...formatDates(newDays),
    }));
  };

  const formatDates = (days) => {
    const formatted = {};
    days.forEach((day) => {
      const today = moment().startOf("day");
      const tomorrow = moment().add(1, "day").startOf("day");

      if (moment(day).isSame(today, "day")) {
        formatted[day.toISOString()] = "Today";
      } else if (moment(day).isSame(tomorrow, "day")) {
        formatted[day.toISOString()] = "Tomorrow";
      } else {
        formatted[day.toISOString()] = moment(day).format("ddd, D/M/YYYY");
      }
    });
    return formatted;
  };

  const calculateDates = (weekDays, weeksToAdd, existingDays) => {
    const result = [];
    const daysToShow = new Set(existingDays.map((day) => day.toISOString()));

    while (result.length < DAYS_PER_LOAD) {
      weekDays.forEach((day) => {
        const dayOfWeek = day.dayOfWeek.toLowerCase();
        let targetDay = moment()
          .startOf("week")
          .day(dayOfWeek)
          .add(weeksToAdd, "weeks"); //get the date of wednesday of the week
        if (targetDay.isBefore(moment(), "day")) {
          targetDay.add(1, "week");
        }
        const targetDayISO = targetDay.toISOString();
        if (!daysToShow.has(targetDayISO)) {
          daysToShow.add(targetDayISO);
          result.push(targetDay);
        }
      });
      weeksToAdd++;
    }
    return result.slice(0, DAYS_PER_LOAD);
  };

  const handleNextClick = () => {
    setWeeksAhead((prev) => prev + 1);
  };

  return (
    <div className="week-view">
      <div className="card-container">
        {displayedDays
          .slice(0, (weeksAhead + 1) * DAYS_PER_LOAD)
          .map((day, index) => {
            const dayOfWeek = moment(day).format("dddd");
            const dayDetails = weekDays.find(
              (wd) => wd.dayOfWeek.toLowerCase() === dayOfWeek.toLowerCase()
            );
            return (
              <CustomDay
                key={index}
                date={day.toDate()}
                formattedDate={formattedDates[day.toISOString()]}
                doctorId={doctorId}
                startOfDayTime={dayDetails ? dayDetails.startTime : ""}
                endOfDayTime={dayDetails ? dayDetails.endTime : ""}
                sessionDuration={dayDetails ? dayDetails.sessionDuration : 30}
                appointments={appointments}
                doctorLastName={doctorLastName}
                doctorFirstName={doctorFirstName}
              />
            );
          })}
      </div>
      <div>
        <button className="next-button" onClick={handleNextClick}>
          More
        </button>
      </div>
    </div>
  );
};

export default CustomWeekView;
