import React, { useState, useEffect } from "react";
import moment from "moment";
import { apiInstance } from "../../../axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomWeekView from "./CustomWeekView";

const DoctorSchedule = ({ doctorId }) => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    moment().startOf("week").toDate()
  );

  useEffect(() => {
    fetchDoctorSchedule();
  }, []);

  const fetchDoctorSchedule = async () => {
    try {
      const response = await apiInstance.get(`/doctors/${doctorId}/schedule`);
      const { weekDays } = response.data;

      const today = moment();
      const currentWeekEvents = [];
      const nextWeekEvents = [];

      weekDays.forEach((day) => {
        const dayOfWeek = day.dayOfWeek.toLowerCase();
        let targetDay = moment().day(dayOfWeek);

        if (targetDay.isBefore(today, "day")) {
          targetDay.add(1, "week");
        }

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

          if (targetDay.isSame(today, "week")) {
            currentWeekEvents.push(event);
          } else {
            nextWeekEvents.push(event);
          }

          currentStartTime.add(sessionDuration).add(15, "minutes");
        }
      });

      setEvents([...currentWeekEvents, ...nextWeekEvents]);
    } catch (error) {
      console.error("Error fetching doctor schedule:", error);
    }
  };

  return (
    <div className="doctor-schedule">
      <CustomWeekView events={events} date={currentDate} doctorId={doctorId} />
    </div>
  );
};

export default DoctorSchedule;
