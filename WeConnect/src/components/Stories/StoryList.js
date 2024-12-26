import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Stories.css";

const StoryList = ({ onImageChange }) => {
  const fileInputRef = useRef(null);
  const [stories, setStories] = useState([]);
  const [selectedStories, setSelectedStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStoryViewOpen, setIsStoryViewOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const progressDuration = 2000; // Duration for each story in milliseconds
  const progressInterval = 30; // Interval for updating progress bar

  // Define an array of 5 male profile images
  const profileImages = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
  ];

  // Fetching stories from the server
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:5053/api/Stories");
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  const handleAddStory = () => fileInputRef.current?.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  // Function to get the stored profile image or assign a random one if it's not in localStorage
  const getRandomProfileImage = (userId) => {
    let storedImages = JSON.parse(localStorage.getItem("profileImages")) || {};

    if (!storedImages[userId]) {
      const randomIndex = Math.floor(Math.random() * profileImages.length);
      const randomImage = profileImages[randomIndex];

      // Store the assigned profile image in localStorage
      storedImages[userId] = randomImage;
      localStorage.setItem("profileImages", JSON.stringify(storedImages));
    }

    return storedImages[userId];
  };

  // Group stories by userId with a profile image assigned only once per user
  const groupedStories = stories.reduce((acc, story) => {
    if (!acc[story.userId]) {
      acc[story.userId] = {
        stories: [],
        profileImage: getRandomProfileImage(story.userId), // Use random profile image, but only once per user
      };
    }
    acc[story.userId].stories.push(story);
    return acc;
  }, {});

  // Open story viewer for selected user
  const openStoryViewer = (userId) => {
    setSelectedStories(groupedStories[userId]?.stories || []);
    setCurrentIndex(0);
    setIsStoryViewOpen(true);
    setIsPlaying(true);
    setProgress(0);
  };

  // Close the story viewer
  const closeStoryViewer = () => {
    setIsStoryViewOpen(false);
    setProgress(0);
  };

  // Navigate to the next story
  const nextStory = () => {
    if (currentIndex < selectedStories.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setProgress(0);
    } else {
      closeStoryViewer();
    }
  };

  // Navigate to the previous story
  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setProgress(0);
    }
  };

  // Auto-play stories with a timer
  useEffect(() => {
    let timer;
    if (isStoryViewOpen && isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const increment = 100 / (progressDuration / progressInterval);
          if (prev + increment >= 100) {
            nextStory();
            return 0;
          }
          return prev + increment;
        });
      }, progressInterval);
    }
    return () => clearInterval(timer);
  }, [isStoryViewOpen, isPlaying, currentIndex]);

  return (
    <div className="stories-container">
      <div className="stories-wrapper">
        {/* Add Story */}
        <div className="story add-story" onClick={handleAddStory}>
          <span className="story-icon">+</span>
          <strong>Add Story</strong>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Display grouped stories */}
        {Object.keys(groupedStories).map((userId) => (
          <div
            key={userId}
            className="story seen"
            onClick={() => openStoryViewer(userId)}
          >
            <span className="item-preview">
              {/* Display profile image */}
              <img
                src={groupedStories[userId].profileImage}
                alt={`${groupedStories[userId].stories[0]?.username}'s profile`}
              />
            </span>
            <strong className="name">
              {groupedStories[userId].stories[0]?.username}
            </strong>
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      {isStoryViewOpen && (
        <div className="story-viewer">
          <button className="close-btn" onClick={closeStoryViewer}>
            &times;
          </button>
          {selectedStories[currentIndex]?.imagePath.endsWith(".mp4") ? (
            <video
              src={`http://localhost:5053/${selectedStories[currentIndex]?.imagePath}`}
              controls
              autoPlay
              className="story-content"
            />
          ) : (
            <img
              src={`http://localhost:5053/${selectedStories[currentIndex]?.imagePath}`}
              alt="Story"
              className="story-content"
            />
          )}
          <button
            className="navigation-btn prev-btn"
            onClick={prevStory}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <button
            className="navigation-btn next-btn"
            onClick={nextStory}
            disabled={currentIndex === selectedStories.length - 1}
          >
            &gt;
          </button>

          {/* Progress Bars */}
          <div className="progress-bars">
            {selectedStories.map((_, index) => (
              <div
                key={index}
                className={`progress-bar ${index === currentIndex ? "active" : ""}`}
              >
                <div
                  className="progress"
                  style={{
                    width: index === currentIndex ? `${progress}%` : "100%",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryList;
