import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "../../../context/NotificationsContext";

const NotificationsDropdown = ({
  notifications,
  loading,
  hasMore,
  setPage,
}) => {
  const { ref, inView } = useInView({
    threshold: 1.0,
  });
  const { markAllAsRead, toggleUnreadFilter } = useNotifications();

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading, setPage]);

  return (
    <div className="notifications-dropdown">
      <div className="notifications-actions">
        <button onClick={markAllAsRead}>Mark All as Read</button>
        <button onClick={toggleUnreadFilter}>Unread Only</button>
      </div>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
      <div ref={ref} />
      {loading && (
        <>
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </>
      )}
    </div>
  );
};
export default NotificationsDropdown;

const NotificationSkeleton = () => {
  return (
    <div className="notification-skeleton">
      <div className="skeleton-img"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-line-short"></div>
        <div className="skeleton-line skeleton-line-long"></div>
        <div className="skeleton-end">
          <div className="skeleton-line skeleton-end-line"></div>
        </div>
      </div>
    </div>
  );
};
