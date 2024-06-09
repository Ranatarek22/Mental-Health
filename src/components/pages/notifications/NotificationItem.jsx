import React from "react";
import { useNotifications } from "../../../context/NotificationsContext";

const NotificationItem = ({ notification }) => {
  const { markAsRead } = useNotifications();
  const handleClick = (e) => {
    if (!notification.isRead) {
      e.preventDefault();
      markAsRead(notification.id).then(() => {
        window.location.href = `/forums/${notification.resources.postId}#${notification.resources.commentId}`;
      });
    }
  };
  return (
    <a
      href={`/forums/${notification.resources.postId}#${notification.resources.commentId}`}
      className={`notification-item ${notification.isRead ? "" : "unread"}`}
      onClick={handleClick}
    >
      <img
        width={40}
        height={40}
        src={notification.notifierPhotoUrl}
        alt="Notifier"
        className="notification-img"
      />
      <div className="notification-content">
        <div className="notification-text">
          <p className="notification-username">
            {notification.notifierUserName}
          </p>
          <p>{notification.message}</p>
        </div>
        <p className="notification-date">
          {new Date(notification.dateCreated).toLocaleString()}
        </p>
      </div>
    </a>
  );
};

export default NotificationItem;
