import React, { useState } from 'react';
import Logout from './Auth/logout';
import { useAuth } from './Auth/AuthContext';
import Notifications from './Notification/Notifications';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications] = useState([
    {
      name: 'Pete Sariya',
      message: 'voted for combination of colors from your brand palette',
      time: '1 month ago',
      image: '/assets/images/user/01.jpg',
    },
    {
      name: 'Dima Davydov',
      message: 'replied to your comment',
      time: '1 month ago',
      image: '/assets/images/user/02.jpg',
    },
    {
      name: 'Esther Howard',
      message: 'reacted to your comment in your post',
      time: '19 min ago',
      image: '/assets/images/user/03.jpg',
    },
  ]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <nav className="navbar navbar-expand-lg navbar-light iq-navbar">
      <div className="container-fluid navbar-inner d-flex justify-content-between align-items-center">
        {/* Sidebar Toggle */}
        <div className="d-flex align-items-center">
          <button
            className="btn btn-light me-3 d-xl-none"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>

        {/* Search Bar */}
        <div className="iq-search-bar flex-grow-1 me-4">
          <form className="searchbox d-flex align-items-center">
            <a
              href="#"
              className="search-link"
              onClick={(e) => e.preventDefault()}
            >
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="7.82491"
                  cy="7.82495"
                  r="6.74142"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
                <path
                  d="M12.5137 12.8638L15.1567 15.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
            <input
              type="text"
              className="form-control bg-light-subtle border-0 rounded-start"
              placeholder="Search for people or groups"
              style={{ paddingLeft: '40px', height: '40px' }}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary rounded-end"
              style={{ height: '40px' }}
            >
              Search
            </button>
          </form>
        </div>

        {/* Navbar Actions */}
        <ul className="navbar-nav d-flex align-items-center">
          {/* Notifications */}
          <li className="nav-item dropdown me-3">
            <button
              className="notification-btn btn position-relative"
              id="notificationDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="notification-icon material-symbols-outlined">
                notifications
              </i>
            
            </button>
            <div
              className="dropdown-menu dropdown-menu-end p-3"
              aria-labelledby="notificationDropdown"
              style={{
                width: '374px',
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {notifications.length > 0 ? (
                <Notifications notifications={notifications} />
              ) : (
                <div className="text-center text-muted">
                  No new notifications
                </div>
              )}
            </div>
          </li>

          {/* User Dropdown */}
          <li className="nav-item dropdown user-dropdown" style={{ paddingRight: '80px' }}>

            <a
              className="d-flex align-items-center dropdown-toggle"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/user/1.jpg`}
                className="img-fluid rounded-circle avatar-48 border border-2"
                alt="user"
              />
            </a>
            <div
  className="dropdown-menu dropdown-menu-end"
  aria-labelledby="userDropdown" style={{marginRight: '36px' }}
>
  <div
    className="card shadow-none m-0"
    style={{ height: '80px', width: '120px' }}
  >
    <div className="card-header">
    <h5 className="mb-0" style={{ fontSize: '10px' }}>
  Hello {user?.username || 'Guest'}
</h5>

      <Logout />
    </div>
  </div>
</div>

          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
