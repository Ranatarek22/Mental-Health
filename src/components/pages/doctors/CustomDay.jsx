import React from "react";
import moment from "moment";

const CustomDay = ({ events, date }) => {
  const dayEvents = events.filter((event) =>
    moment(event.start).isSame(date, "day")
  );

  if (dayEvents.length === 0) {
    return null;
  }

  const formattedDate = () => {
    const today = moment().startOf("day");
    const tomorrow = moment().add(1, "day").startOf("day");

    if (moment(date).isSame(today, "day")) {
      return "Today";
    } else if (moment(date).isSame(tomorrow, "day")) {
      return "Tomorrow";
    } else {
      return moment(date).format("ddd, D/M/YYYY");
    }
  };

  return (
    <div className="day-card">
      <div className="day-header">
        <span style={{ color: "var(--third-color)" }}>{formattedDate()}</span>
      </div>
      <div className="event-slots">
        {dayEvents.slice(0, 6).map((event, index) => (
          <div
            key={index}
            className="event-slot"
            style={{ backgroundColor: event.color }}
          >
            {moment(event.start).format("HH:mm")} -{" "}
            {moment(event.end).format("HH:mm")}
          </div>
        ))}
      </div>

      <button className="book-button">Book</button>
    </div>
  );
};

export default CustomDay;
