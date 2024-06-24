import React, { useState, useEffect } from "react";
import moment from "moment";
import CustomDay from "./CustomDay";
import { apiInstance } from "../../../axios";

const CustomWeekView = ({ doctorId }) => {
  const [events, setEvents] = useState([]);
  const [displayedDays, setDisplayedDays] = useState([]);
  const [formattedDates, setFormattedDates] = useState({});
  const [weeksAhead, setWeeksAhead] = useState(0);
  const [visibleDaysCount, setVisibleDaysCount] = useState(3);
  const [totalDaysCount, setTotalDaysCount] = useState(0);
  const DAYS_PER_LOAD = 3;

  useEffect(() => {
    fetchDoctorSchedule();
  }, []);

  useEffect(() => {
    if (weeksAhead > 0) {
      fetchMoreDates();
    }
  }, [weeksAhead]);

  const fetchDoctorSchedule = async () => {
    try {
      const response = await apiInstance.get(`/doctors/${doctorId}/schedule`);
      const { weekDays } = response.data;
      if (!weekDays || weekDays.length === 0) {
        throw new Error("No weekDays data found");
      }

      const initialDays = calculateDates(weekDays, 0, DAYS_PER_LOAD);
      setDisplayedDays(initialDays);
      setTotalDaysCount(weekDays.length * 52);

      const initialEvents = calculateEvents(weekDays, 0, DAYS_PER_LOAD);
      setEvents(initialEvents);

      const formatted = formatDates(initialDays);
      setFormattedDates(formatted);
    } catch (error) {
      console.error("Error fetching doctor schedule:", error);
    }
  };

  const fetchMoreDates = async () => {
    try {
      const response = await apiInstance.get(`/doctors/${doctorId}/schedule`);
      const { weekDays } = response.data;

      if (!weekDays || weekDays.length === 0) {
        throw new Error("No weekDays data found");
      }

      const moreDays = calculateDates(
        weekDays,
        weeksAhead,
        DAYS_PER_LOAD,
        displayedDays
      );

      setDisplayedDays((prevDays) => [...prevDays, ...moreDays]);

      const moreEvents = calculateEvents(
        weekDays,
        weeksAhead,
        DAYS_PER_LOAD,
        displayedDays.length
      );
      setEvents((prevEvents) => [...prevEvents, ...moreEvents]);

      const formatted = formatDates(moreDays);
      setFormattedDates((prevFormatted) => ({
        ...prevFormatted,
        ...formatted,
      }));
    } catch (error) {
      console.error("Error fetching more doctor schedule:", error);
    }
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

  const calculateDates = (weekDays, weeksToAdd, limit, existingDays = []) => {
    const dates = new Set(existingDays.map((day) => day.toISOString()));
    const result = [];

    for (let i = 0; i < limit; i++) {
      weekDays.forEach((day) => {
        const dayOfWeek = day.dayOfWeek.toLowerCase();
        let targetDay = moment()
          .startOf("week")
          .day(dayOfWeek)
          .add(weeksToAdd + Math.floor(i / weekDays.length), "weeks");
        if (targetDay.isBefore(moment(), "day")) {
          targetDay.add(1, "week");
        }
        const targetDayISO = targetDay.toISOString();
        if (!dates.has(targetDayISO)) {
          dates.add(targetDayISO);
          result.push(targetDay);
        }
      });
    }
    return result;
  };

  const calculateEvents = (
    weekDays,
    weeksToAdd,
    limit,
    existingDaysCount = 0
  ) => {
    const allEvents = [];
    for (let i = existingDaysCount; i < existingDaysCount + limit; i++) {
      weekDays.forEach((day) => {
        const dayOfWeek = day.dayOfWeek.toLowerCase();
        let targetDay = moment()
          .startOf("week")
          .day(dayOfWeek)
          .add(weeksToAdd + Math.floor(i / weekDays.length), "weeks");

        const startTime = day.startTime;
        const endTime = day.endTime;

        const event = {
          start: targetDay
            .clone()
            .set({
              hour: startTime.substring(0, 2),
              minute: startTime.substring(3, 5),
            })
            .toDate(),
          end: targetDay
            .clone()
            .set({
              hour: endTime.substring(0, 2),
              minute: endTime.substring(3, 5),
            })
            .toDate(),
          color: "var(--third-color)",
        };

        allEvents.push(event);
      });
    }
    return allEvents;
  };

  const handleNextClick = () => {
    setWeeksAhead((prev) => prev + 1);
    setVisibleDaysCount((prevCount) => prevCount + DAYS_PER_LOAD);
  };

  return (
    <div className="week-view">
      <div className="card-container">
        {displayedDays.slice(0, visibleDaysCount).map((day, index) => (
          <CustomDay
            key={index}
            date={day.toDate()}
            formattedDate={formattedDates[day.toISOString()]}
            events={events}
            doctorId={doctorId}
          />
        ))}
      </div>
      <div>
        {visibleDaysCount < totalDaysCount && (
          <button className="next-button" onClick={handleNextClick}>
            More
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomWeekView;
