import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CustomDay = ({ events, date, doctorId }) => {
  const navigate = useNavigate();

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

  const reserveNavigation = (start, end) => {
    const duration = moment.duration(moment(end).diff(moment(start)));
    const formattedDuration = moment
      .utc(duration.asMilliseconds())
      .format("HH:mm:ss");
    navigate(
      `/reserve/${doctorId}/${start.toISOString()}/${end.toISOString()}/${formattedDuration}`
    );
    
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
            style={{ backgroundColor: event.color, cursor: "pointer" }}
            onClick={() =>
              reserveNavigation(moment(event.start), moment(event.end))
            
            }
           
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
