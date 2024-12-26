import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FollowSuggestions.css'; // Import the updated CSS for styling

const FollowSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sentFollowRequests, setSentFollowRequests] = useState([]);

  const userId = localStorage.getItem('userId');
  console.log('Current User ID:', userId); // Log current userId for debugging

  const fetchFollowSuggestions = async () => {
    if (!userId) {
      setError("User not logged in or ID is missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5053/api/User/follow-suggestions/${userId}`);
      console.log("Follow suggestions fetched:", response.data);

      const suggestionsData = response.data || [];
      console.log('Suggestions to Render:', suggestionsData);

      if (!suggestionsData.length) {
        setError("No follow suggestions found.");
        setLoading(false);
        return;
      }

      const filteredSuggestions = suggestionsData.filter(
        (suggestion) => !sentFollowRequests.includes(suggestion.id)
      );

      console.log('Filtered Suggestions:', filteredSuggestions);
      setSuggestions(filteredSuggestions);
    } catch (err) {
      console.error("Error fetching follow suggestions:", err.response?.data || err.message);
      setError("Failed to fetch follow suggestions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowSuggestions();
  }, [userId]);

  const handleFollowRequest = async (receiverId) => {
    try {
      const response = await axios.post('http://localhost:5053/api/User/send-follow-request', {
        senderId: userId,
        receiverId,
      });

      if (response.data?.message) {
        alert(response.data.message);

        setSentFollowRequests((prevRequests) => [...prevRequests, receiverId]);
        setSuggestions((prevSuggestions) =>
          prevSuggestions.filter((suggestion) => suggestion.id !== receiverId)
        );
      }
    } catch (err) {
      console.error('Error sending follow request:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to send follow request.');
    }
  };

  const handleRejectRequest = async (receiverId) => {
    try {
      const response = await axios.post('http://localhost:5053/api/User/reject-follow-request', {
        senderId: userId,
        receiverId,
      });

      if (response.data?.message) {
        alert(response.data.message);

        setSuggestions(prevSuggestions =>
          prevSuggestions.filter(suggestion => suggestion.id !== receiverId)
        );
      }
    } catch (err) {
      console.error('Error rejecting follow request:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to reject follow request.');
    }
  };

  // Function to generate a profile image URL based on userId
  const getProfileImage = (userId) => {
    return `https://randomuser.me/api/portraits/men/${userId % 100}.jpg`;
  };

  if (loading) return <div className="follow-suggestions-loading">Loading...</div>;
  if (error) return <div className="follow-suggestions-error">{error}</div>;

  return (
    <div className="follow-suggestions-container">
      <div className="follow-suggestions-card mb-4">
        <div className="follow-suggestions-header d-flex justify-content-between">
          <h4 className="follow-suggestions-title">Suggestions for you</h4>
        </div>
        <div className="follow-suggestions-body pt-0">
          <ul className="follow-suggestions-list m-0 p-0">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <li className="follow-suggestions-item mb-3" key={suggestion.id}>
                  <div className="follow-suggestions-item-inner d-flex align-items-center gap-3">
                    <img
                      src={getProfileImage(suggestion.id)} // Use generated image based on userId
                      alt="user-avatar"
                      className="follow-suggestions-avatar avatar-60 avatar-rounded img-fluid d-inline-block"
                    />
                    <div>
                      <div className="follow-suggestions-actions d-flex align-items-center justify-content-between gap-2">
                        <h5 className="follow-suggestions-username">{suggestion.username}</h5>
                        <div className="follow-suggestions-buttons d-flex align-items-center gap-2">
                          <button 
                            className="follow-suggestions-btn follow-suggestions-btn-primary"
                            onClick={() => handleFollowRequest(suggestion.id)}
                          >
                            <i className="material-symbols-outlined font-size-14">add</i>
                          </button>
                          <button 
                            className="follow-suggestions-btn follow-suggestions-btn-danger"
                            onClick={() => handleRejectRequest(suggestion.id)}
                          >
                            <i className="material-symbols-outlined font-size-14">close</i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No suggestions available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FollowSuggestions;
