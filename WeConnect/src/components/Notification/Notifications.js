import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTrashAlt, FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa'; // Additional icons
import AuthService from '../Auth/AuthService'; // Import AuthService for API calls
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch the current logged-in user and their notifications
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
    if (userId) {
      setUser({ id: userId });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.id) {
      AuthService.getNotifications(user.id)
        .then((response) => {
          setNotifications(response);
        })
        .catch((error) => {
          console.error('Error fetching notifications:', error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleMarkAsRead = (notificationId) => {
    AuthService.markAsRead(notificationId)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        );
      })
      .catch((error) => {
        console.error('Error marking notification as read:', error);
      });
  };

  const handleDeleteNotification = (notificationId) => {
    AuthService.deleteNotification(notificationId)
      .then(() => {
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.id !== notificationId
          )
        );
      })
      .catch((error) => {
        console.error('Error deleting notification:', error);
      });
  };

  return (
    <div className="notifications-container">
      <header className="notifications-header">
        <FaBell className="notifications-icon" />
        Notifications
      </header>
      {loading ? (
        <p className="loading-text">Loading notifications...</p>
      ) : notifications.length > 0 ? (
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`notification-item ${notification.isRead ? '' : 'unread'}`}
            >
              <div className="notification-content">
                <div className="notification-avatar">
                  {notification.avatar ? (
                    <img src={notification.avatar} alt="Avatar" />
                  ) : (
                    <FaUserCircle />
                  )}
                </div>
                <div className="notification-text">
                  <span className="notification-message">{notification.message}</span>
                  <span className="notification-time">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="action-buttons">
                {!notification.isRead && (
                  <button
                    className="mark-as-read-button"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <FaCheckCircle />
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteNotification(notification.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
