import React, { useEffect, useState } from "react";
import { useNotifications } from "../../../context/NotificationsContext";
import NotificationsDropdown from "./NotificationsDropdown";
import { FaBell } from "react-icons/fa6";

const NotificationIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    newNotificationCount,
    notifications,
    fetchNotifications,
    loading,
    hasMore,
  } = useNotifications();

  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  return (
    <div className="notification-icon">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notification-button"
      >
        <FaBell
          className="pr-3  m-2 dropdown-toggle ml-2"
          style={{ fontSize: "1.8rem", color: "grey" }}
        />
        {newNotificationCount > 0 && (
          <span className="notification-count">{newNotificationCount}</span>
        )}
      </button>
      {isOpen && (
        <NotificationsDropdown
          setPage={setPage}
          notifications={notifications}
          fetchNotifications={fetchNotifications}
          loading={loading}
          hasMore={hasMore}
        />
      )}
    </div>
  );
};

export default NotificationIcon;
