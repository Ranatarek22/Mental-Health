import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CustomDay = ({ events, date, formattedDate, doctorId }) => {
  const navigate = useNavigate();

  // Filter events for the specific day
  const dayEvents = events.filter((event) =>
    moment(event.start).isSame(date, "day")
  );

  if (dayEvents.length === 0) {
    return null;
  }

  // Get the first event of the day
  const firstEvent = dayEvents[0];

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
        <span style={{ color: "var(--third-color)" }}>{formattedDate}</span>
      </div>
      <div className="event-slots">
        <div
          className="event-slot"
          style={{
            backgroundColor: firstEvent.color,
            cursor: "pointer",
            padding: "10px",
            margin: "5px 0",
            borderRadius: "5px",
            textAlign: "center",
          }}
          onClick={() =>
            reserveNavigation(moment(firstEvent.start), moment(firstEvent.end))
          }
        >
          {moment(firstEvent.start).format("HH:mm")}
        </div>
        <div
          className="event-slot"
          style={{
            backgroundColor: firstEvent.color,
            cursor: "pointer",
            padding: "10px",
            margin: "5px 0",
            borderRadius: "5px",
            textAlign: "center",
          }}
          onClick={() =>
            reserveNavigation(moment(firstEvent.start), moment(firstEvent.end))
          }
        >
          {moment(firstEvent.end).format("HH:mm")}
        </div>
      </div>
      <button
        className="book-button"
        onClick={() => reserveNavigation(dayEvents[0].start, dayEvents[0].end)}
      >
        Book
      </button>
    </div>
  );
};

export default CustomDay;
