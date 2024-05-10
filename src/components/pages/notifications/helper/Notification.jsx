import React from "react";
import { css } from "@emotion/react";
import { calculateDuration } from "../../ForumsPage/Date";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification }) => {
  const navigate = useNavigate();
  const notificationDate = calculateDuration(notification.dateCreated);

  const containerStyle = css`
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    }
  `;

  const messageStyle = css`
    margin-bottom: 8px;
    font-weight: bold;
  `;

  const infoStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-size: 0.8rem;
  `;

  return (
    <div
      key={notification.id}
      className="notification-container"
      css={containerStyle}
      onClick={() => navigate(`/forums/${notification.resources.postId}`)}
    >
      <div className="notification-message" css={messageStyle}>
        <p>{notification.message}</p>
      </div>
      <div className="notification-info" css={infoStyle}>
        <p>{notificationDate}</p>
        <p>{notification.type}</p>
      </div>
    </div>
  );
};

export default Notification;
