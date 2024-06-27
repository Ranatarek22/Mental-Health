import React, { useState, useEffect } from "react";
import moment from "moment";
import CustomDay from "./CustomDay";
import { apiInstance } from "../../../axios";

const CustomWeekView = ({ doctorId, appointments }) => {
  const [events, setEvents] = useState([]);
  const [displayedDays, setDisplayedDays] = useState([]);
  const [formattedDates, setFormattedDates] = useState({});
  const [weeksAhead, setWeeksAhead] = useState(0);
  const [weekDays, setWeekDays] = useState([]);
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
    startWeek = weeksAhead,
    daysCount = DAYS_PER_LOAD
  ) => {
    const newDays = calculateDates(
      weekDaysData,
      startWeek,
      daysCount,
      displayedDays
    );
    const newEvents = calculateEvents(
      weekDaysData,
      startWeek,
      daysCount,
      events
    );

    const updatedDays = [...displayedDays, ...newDays].sort((a, b) =>
      a.isBefore(b) ? -1 : 1
    );

    setDisplayedDays(updatedDays);
    setEvents((prevEvents) => [...prevEvents, ...newEvents]);
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

  const calculateDates = (weekDays, weeksToAdd, limit, existingDays) => {
    const result = [];
    const daysToShow = new Set(existingDays.map((day) => day.toISOString()));

    while (result.length < limit) {
      weekDays.forEach((day) => {
        const dayOfWeek = day.dayOfWeek.toLowerCase();
        let targetDay = moment()
          .startOf("week")
          .day(dayOfWeek)
          .add(weeksToAdd, "weeks");
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
    return result.slice(0, limit);
  };

  const calculateEvents = (weekDays, weeksToAdd, limit, existingEvents) => {
    const allEvents = [...existingEvents];
    for (let i = 0; i < limit; i++) {
      weekDays.forEach((day) => {
        const dayOfWeek = day.dayOfWeek.toLowerCase();
        let targetDay = moment()
          .startOf("week")
          .day(dayOfWeek)
          .add(weeksToAdd + Math.floor(i / weekDays.length), "weeks");

        const startHour = day.startTime.substring(0, 2);
        const startMinute = day.startTime.substring(3, 5);
        const endHour = day.endTime.substring(0, 2);
        const endMinute = day.endTime.substring(3, 5);
        const sessionDuration = moment.duration(day.sessionDuration);

        let currentStartTime = targetDay.clone().set({
          hour: startHour,
          minute: startMinute,
        });
        const currentEndTime = targetDay.clone().set({
          hour: endHour,
          minute: endMinute,
        });

        while (currentStartTime.isBefore(currentEndTime)) {
          const eventEndTime = currentStartTime.clone().add(sessionDuration);
          if (eventEndTime.isAfter(currentEndTime)) {
            break;
          }

          const event = {
            start: currentStartTime.toDate(),
            end: eventEndTime.toDate(),
            color: "var(--third-color)",
          };

          allEvents.push(event);
          currentStartTime.add(sessionDuration).add(15, "minutes");
        }
      });
    }
    return allEvents;
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
