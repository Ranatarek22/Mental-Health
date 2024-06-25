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

  const reserveNavigation = (start, end) => {
    const duration = moment.duration(moment(end).diff(moment(start)));
    const formattedDuration = moment
      .utc(duration.asMilliseconds())
      .format("HH:mm:ss");
    navigate(
      `/reserve/${doctorId}/${start.toISOString()}/${end.toISOString()}/${formattedDuration}`
    );
  };

  // Group events by their start time
  const groupedEvents = dayEvents.reduce((acc, event) => {
    const startTime = moment(event.start).format("HH:mm");
    if (!acc[startTime]) {
      acc[startTime] = [];
    }
    acc[startTime].push(event);
    return acc;
  }, {});

  return (
    <div className="day-card">
      <div className="day-header">
        <span style={{ color: "var(--third-color)" }}>{formattedDate}</span>
      </div>
      <div className="event-slots">
        {Object.keys(groupedEvents).map((startTime, index) => (
          <div key={index}>
            <div
              className="event-slot"
              style={{
                backgroundColor: groupedEvents[startTime][0].color,
                cursor: "pointer",
                padding: "10px",
                margin: "5px 0",
                borderRadius: "5px",
              }}
              onClick={() =>
                reserveNavigation(
                  moment(groupedEvents[startTime][0].start),
                  moment(groupedEvents[startTime][0].end)
                )
              }
            >
              {startTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomDay;
