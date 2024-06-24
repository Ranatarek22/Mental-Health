export const formatDateTimeRange = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = end - start;
  const durationMins = Math.round(durationMs / 60000); // Total duration in minutes

  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    start
  );
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(start);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(start);

  return `${durationMins} mins on ${dayName}, ${formattedDate} at ${formattedTime}`;
};