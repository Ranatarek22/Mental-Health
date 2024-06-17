// src/components/pages/CalendarPage/CalendarPage.jsx

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 0,
    title: "All Day Event",
    allDay: true,
    start: new Date(2024, 5, 17),
    end: new Date(2024, 5, 17),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2024, 5, 17),
    end: new Date(2024, 5, 18),
  },
  // Add more events here
];

const AppointmentPage = () => {
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default AppointmentPage;
