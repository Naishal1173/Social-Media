import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext'; // Correct path
import Register from './components/Auth/Register'; // Your existing register page
import Login from './components/Auth/Login'; // Your existing login page
import FollowRequestsPage from './components/Suggestions/FollowRequestsPage'; // Follow requests page
import UserProfilePage from './components/Suggestions/UserProfilePage'; // User profile page
import StoryUpload from './components/Stories/StoryUpload'; // Story upload page
import StoryList from './components/Stories/StoryList'; // Story list page
import PostList from './components/Posts/PostList'; // Post list page
import UploadPost from './components/Posts/UploadPost'; // Upload post page
import Layout from './components/Layout'; // Layout page
import FollowSuggestions from './components/Suggestions/FollowSuggestions'; // Follow suggestions page
import ChatComponent from './components/Chats/ChatComponent'; // Chat component
import Notifications from './components/Notification/Notifications'; // Notifications page
import Followers from './components/Suggestions/Followers'; // Followers page (Added this import)

function App() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch userId from local storage when the app loads
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    return (
        <AuthProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Home route can be a dashboard or landing page */}

                        {/* Protected Routes */}
                        <Route path="/follow-requests" element={userId ? <FollowRequestsPage /> : <FollowRequestsPage />} />
                        <Route path="/user-profile" element={userId ? <UserProfilePage /> : <UserProfilePage />} />
                        <Route path="/followers" element={userId ? <Followers /> : <Followers />} /> {/* Added Followers route */}
                        <Route path="/stories" element={userId ? <StoryList /> : <StoryList />} />
                        <Route path="/upload-story" element={userId ? <StoryUpload /> : <StoryUpload />} />
                        <Route path="/posts" element={userId ? <PostList userId={userId} /> : <PostList userId={userId} />} />
                        <Route path="/upload-post" element={userId ? <UploadPost /> : <UploadPost />} />
                        <Route path="/layout" element={userId ? <Layout userId={userId} /> : <Layout userId={userId} />} />
                        <Route path="/follow-suggestions" element={userId ? <FollowSuggestions userId={userId} /> : <FollowSuggestions userId={userId} />} />
                        <Route path="/chats" element={userId ? <ChatComponent senderId={userId} /> : <ChatComponent senderId={userId} />} />
                        <Route path="/notification" element={userId ? <Notifications userId={userId} /> : <Notifications userId={userId} />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
