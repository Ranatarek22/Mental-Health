// components/NotificationsProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import toast from "react-hot-toast";

// Create the context
const NotificationsContext = createContext(undefined);

// Custom hook to use the notifications context
export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
};

// NotificationsProvider component
export const NotificationsProvider = ({ token, children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [hubConnection, setHubConnection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const pageSize = 20;

  // Function to fetch notifications
  const fetchNotifications = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nexus-api-h3ik.onrender.com/api/notifications/users/me?PageNumber=${page}&PageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newNotifications = await response.json();
      setNotifications((prev) => [...prev, ...newNotifications]);
      setHasMore(newNotifications.length === pageSize);
      setLoading(false);

      // Update unread count
      const unreadCount = newNotifications.filter((n) => !n.isRead).length;
      setNewNotificationCount((prev) => prev + unreadCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(
        `https://nexus-api-h3ik.onrender.com/api/notifications/${id}/read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setNewNotificationCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(
        `https://nexus-api-h3ik.onrender.com/api/notifications/users/me/read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true }))
      );
      setNewNotificationCount(0);
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const toggleUnreadFilter = () => {
    setShowUnreadOnly((prev) => !prev);
  };

  useEffect(() => {
    if (token) {
      const hubConnect = new signalR.HubConnectionBuilder()
        .withUrl("https://nexus-api-h3ik.onrender.com/notification-hub", {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      hubConnect.start().catch((err) => {
        console.error("Error connecting to server:", err);
      });

      hubConnect.on("ReceiveNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        if (!notification.isRead) {
          setNewNotificationCount((prev) => prev + 1);
        }

        new Audio("/notification-sound.mp3").play();
        toast.success(
          `${notification.notifierUserName} ${notification.message}`
        );
        document.title = "New Notification!";
      });

      hubConnect.onclose((error) => {
        console.error("Connection closed due to error:", error);
      });

      setHubConnection(hubConnect);
    }

    return () => {
      if (hubConnection) {
        hubConnection.stop().then(() => console.log("Connection stopped"));
      }
    };
  }, [token]);

  const filteredNotifications = showUnreadOnly
    ? notifications.filter((notification) => !notification.isRead)
    : notifications;
  return (
    <NotificationsContext.Provider
      value={{
        hasMore,
        loading,
        notifications: filteredNotifications,
        newNotificationCount,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        toggleUnreadFilter,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
