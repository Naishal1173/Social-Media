import React from 'react';
import Navbar from './Navbar'; // Import your Navbar component
import Sidebar from './Sidebar'; // Import your Sidebar component
import Rsidebar from './Rsidebar'; // Import the Right Sidebar Component (with Chat)
import StoryUpload from './Stories/StoryUpload'; // Import your StoryUpload component
import UploadPost from './Posts/UploadPost'; // Import your UploadPost component
import FollowSuggestions from './Suggestions/FollowSuggestions'; // Import the FollowSuggestions component
import { useAuth } from './Auth/AuthContext';
import { Navigate } from 'react-router-dom';

const Layout = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return (
        <div className="content-inner" id="page_layout">
            <Navbar /> {/* Navbar Component */}

            <div className="container">
                <div className="row gx-4">
                    {/* Left Sidebar */}
                    <div className="col-lg-3">
                        <Sidebar /> {/* Sidebar Component */}
                    </div>

                    {/* Main Content (Story Upload, Post Upload) */}
                    <div className="col-lg-6" id="dynamicDivContainer">
                        {/* Story Upload Section */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <StoryUpload /> {/* Story Upload Component */}
                            </div>
                        </div>

                        {/* Upload Post Section */}
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between border-bottom">
                                <h5 className="card-title">Add a Post</h5>
                            </div>
                            <div className="card-body">
                                <UploadPost /> {/* Upload Post Component */}
                            </div>
                        </div>

                        {/* You can add other sections here if needed */}
                    </div>

                    {/* Right Sidebar with Follow Suggestions and Chat */}
                    <div className="col-lg-3">
                        {/* Follow Suggestions Section */}
                        <FollowSuggestions /> {/* Follow Suggestions Component */}
                    </div>
                    {/* Right Sidebar (Chat or additional content) */}
                    <Rsidebar /> {/* Right Sidebar Component */}
                </div>
            </div>
        </div>
    );
};

export default Layout;
