import React from "react";
import { css } from "@emotion/react";
import { calculateDuration } from "../../ForumsPage/Date";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification }) => {
  const navigate = useNavigate();
  const notificationDate = calculateDuration(notification.dateCreated);

  return (
    <div
      key={notification.id}
      className="notification-container"
      onClick={() => navigate(`/forums/${notification.resources.postId}`)}
    >
      <div className="notification-message">
        <p>{notification.message}</p>
      </div>
      <div className="notification-info">
        <p>{notificationDate}</p>
        <p>{notification.type}</p>
      </div>
    </div>
  );
};

export default Notification;
