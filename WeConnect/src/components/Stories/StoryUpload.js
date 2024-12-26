import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoryList from './StoryList';
import './Stories.css';

const StoryUpload = () => {
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Track user loading state
  const [loadingStories, setLoadingStories] = useState(false); // Track story loading state
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  useEffect(() => {
    if (userId) {
      fetchUser(); // Fetch user data if userId is available
    } else {
      console.error('User ID is not available. Please log in.');
    }
  }, [userId]);

  useEffect(() => {
    if (user) { // Fetch stories after user is loaded
      fetchAllStories();
    }
  }, [user]); // Trigger fetch when user is available

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5053/api/users/${userId}`);
      setUser(response.data);
      console.log('Fetched User:', response.data);
      setLoadingUser(false); // Set loading state to false after user is fetched
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
      // alert('Failed to fetch user data. Please try again later.');
      setLoadingUser(false); // Set loading state to false even on error
    }
  };

  const fetchAllStories = async () => {
    setLoadingStories(true); // Set loading state for stories
    try {
      const response = await axios.get('http://localhost:5053/api/stories');
      const fetchedStories = response.data || [];
      console.log('Fetched Stories:', fetchedStories);
      setStories(fetchedStories);
    } catch (error) {
      console.error('Error fetching stories:', error.response?.data || error.message);
      alert('Failed to fetch stories. Please try again later.');
    } finally {
      setLoadingStories(false); // Set loading state to false after fetching
    }
  };

  const handleImageChange = async (file) => {
    await uploadStory(file);
  };

  const uploadStory = async (file) => {
    const formData = new FormData();
    formData.append('mediaFile', file); // Corrected to append 'mediaFile' only
    formData.append('userId', userId);

    try {
      await axios.post('http://localhost:5053/api/stories/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Story uploaded successfully!');
      fetchAllStories(); // Refresh stories after uploading
    } catch (error) {
      console.error('Error uploading story:', error);
      alert(`Failed to upload story: ${error.message}`);
    }
  };

  return (
    <div className="story-upload">
      {loadingUser ? (
        <p>Loading user data...</p> // Show loading state while user is being fetched
      ) : loadingStories ? (
        <p>Loading stories...</p> // Show loading state while stories are being fetched
      ) : (
        <StoryList stories={stories} onImageChange={handleImageChange} user={user} />
      )}
    </div>
  );
};

export default StoryUpload;
