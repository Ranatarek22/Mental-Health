import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";
import { useAuthStore } from "../../../hooks/use-auth-store";

import { apiInstance } from "../../../axios";
import * as signalR from "@microsoft/signalr";
import { customToast } from "./helper/customToast"; // Import custom toast
import Notification from "./helper/Notification";

export default function Notifications() {
  const userId = useAuthStore((state) => state.userId);
  const token = useAuthStore((state) => state.token);
  const [notifications, setNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [hubConnection, setHubConnection] = useState(null);

  const createHubConnection = async () => {
    const hubConnect = new signalR.HubConnectionBuilder()
      .withUrl("https://nexus-api-h3ik.onrender.com/notification-hub", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    // handle any error happens method 1
    hubConnect.start().catch((err) => {
      console.error("Error connecting to server:", err);
    });
    // handle any error happens method 2
    // try {
    //   await hubConnect.start();
    //   console.log("Connection successful!");
    // } catch (err) {
    //   console.error("Error connecting to server:", err);
    // }

    // lessen to ReceiveNotification to receive any new notification
    hubConnect.on("ReceiveNotification", (notification) => {
      // Update notifications array with new notification
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
      // Display toast for the new notification
      customToast(notification.message, notification.id);
    });

    hubConnect.onclose((error) => {
      console.error("Connection closed due to error:", error);
      // Handle reconnecting or other logic here
    });

    setHubConnection(hubConnect);
  };

  const fetchNotifications = async () => {
    try {
      const response = await apiInstance.get(
        `/notifications/user/${userId}?PageNumber=${page}&PageSize=${pageSize}`
      );
      const newNotifications = response.data;
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...newNotifications,
      ]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newNotifications.length === pageSize);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    createHubConnection();

    return () => {
      hubConnection?.stop();
    };
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="w-100">
      <div
        className="d-flex flex-column"
        style={{ backgroundColor: "#9cd8e7" }}
      >
        <div className="notification">
          <InfiniteScroll
            dataLength={notifications.length}
            next={fetchNotifications}
            hasMore={hasMore}
            loader={<SyncLoader color={"#36D7B7"} css={override} size={15} />}
            style={{ overflow: "hidden" }}
            endMessage={<p>No more notifications</p>}
          >
            {notifications.map((notification) => (
              <div key={notification.id}>
                <Notification notification={notification} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
