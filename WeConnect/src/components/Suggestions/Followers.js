import React, { useEffect, useState } from 'react';
import AuthService from '../Auth/AuthService';
import Navbar from '../Navbar';  // Import Navbar component
import Sidebar from '../Sidebar'; // Import Sidebar component
import Rsidebar from '../Rsidebar'; // Import Right Sidebar component
import './Followers.css';

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log('Fetching followers for user ID:', userId);

    const fetchFollowers = async () => {
      try {
        const fetchedFollowers = await AuthService.getFollowers(userId);
        console.log('Fetched followers:', fetchedFollowers);
        setFollowers(Array.isArray(fetchedFollowers) ? fetchedFollowers : []);
      } catch (error) {
        setError('Error fetching followers');
        console.error('Error fetching followers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Navbar */}
      <Navbar /> {/* Navbar component */}

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-12">
            <Sidebar /> {/* Sidebar component */}
          </div>

          {/* Followers Content */}
          <div className="col-md-6 col-12">
            <div className="container mt-4">
              <h2 className="followers-title text-dark font-weight-bold mb-4">Followers</h2>

              <div className="followers-grid-container row">
                {followers.length > 0 ? (
                  followers.map((follower) => (
                    <div key={follower.id} className="col-md-6 col-lg-4">
                      <FollowerCard follower={follower} />
                    </div>
                  ))
                ) : (
                  <p>No followers found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-md-3 col-12">
            <Rsidebar /> {/* Right Sidebar component */}
          </div>
        </div>
      </div>
    </div>
  );
};

const FollowerCard = ({ follower }) => {
  // Use useState to store the image URLs for the follower, 
  // and only generate random images once per follower
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const generateRandomImage = (type) => {
      const randomIndex = Math.floor(Math.random() * 100);
      const imageUrl = type === 'profile'
        ? `https://randomuser.me/api/portraits/men/${randomIndex}.jpg`
        : `https://picsum.photos/1200/600?=${randomIndex}`;
      return imageUrl;
    };

    // Set profile image only if not already stored in localStorage
    const storedProfileImage = localStorage.getItem(`profileImage_${follower.id}`);
    if (!storedProfileImage) {
      const newProfileImage = generateRandomImage('profile');
      localStorage.setItem(`profileImage_${follower.id}`, newProfileImage);
      setProfileImage(newProfileImage);
    } else {
      setProfileImage(storedProfileImage);
    }

    // Set cover image only if not already stored in localStorage
    const storedCoverImage = localStorage.getItem(`coverImage_${follower.id}`);
    if (!storedCoverImage) {
      const newCoverImage = generateRandomImage('cover');
      localStorage.setItem(`coverImage_${follower.id}`, newCoverImage);
      setCoverImage(newCoverImage);
    } else {
      setCoverImage(storedCoverImage);
    }
  }, [follower.id]);

  return (
    <div className="follower-card-container card">
      <div className="cover-photo-container">
        <img
          src={coverImage || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
          alt="Cover"
          className="follower-card-cover-photo"
        />
      </div>
      <div className="follower-card-body card-body">
        <div className="follower-profile-detail">
          <div className="follower-profile-img">
            <img
              src={profileImage || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`}
              alt="Profile"
              className="follower-profile-image"
            />
          </div>
          <div className="follower-user-data">
            <h4 className="follower-username">{follower.username}</h4>
          </div>
        </div>
        <button
          type="button"
          style={{ height: '50px', width: '200px' }}
          className="follower-btn btn btn-primary"
        >
          Following
        </button>
      </div>
    </div>
  );
};

export default Followers;
