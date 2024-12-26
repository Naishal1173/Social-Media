import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './PostList';
import './UploadPost.css';

const UploadPost = () => {
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false); // Show/hide modal
    const [privacy, setPrivacy] = useState('public'); // Default privacy
    const [taggedFriends, setTaggedFriends] = useState([]); // For tagging friends
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetchPosts();
        } else {
            console.error("User ID is not available. Please log in.");
        }
    }, [userId]);

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        formData.append('userId', userId);
        formData.append('caption', caption);
        formData.append('title', title);
        formData.append('privacy', privacy);
        formData.append('taggedFriends', JSON.stringify(taggedFriends));
    
        try {
            await axios.post('http://localhost:5053/api/post/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            fetchPosts();
            resetForm();
            setShowModal(false);
        } catch (error) {
            console.error('Error uploading post:', error);
        }
    };
    
    
    const fetchPosts = async () => {
        try {
            const response = await axios.get(`http://localhost:5053/api/post?userId=${userId}`);
            console.log('Fetched posts:', response.data);
            setPosts(response.data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setCaption('');
        setImageFile(null);
        setTaggedFriends([]);
        setPrivacy('public');
    };

    const handleTagFriend = (friend) => {
        setTaggedFriends((prev) => [...prev, friend]);
    };

    const handleRemoveTag = (friend) => {
        setTaggedFriends((prev) => prev.filter((f) => f !== friend));
    };

    return (
        <div className="upload-post-wrapper">
            <button 
    onClick={() => setShowModal(true)} 
    style={{
        padding: '12px 25px',
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        borderRadius: '8px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
        transition: 'all 0.3s ease',
        display: 'inline-block',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '30px', // Added margin-bottom here to separate the button from the posts below
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'} 
    onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'} 
>
    Create Post
</button>

    
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content-wrapper">
                        <span 
                            className="close-modal" 
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </span>
    
                        <form onSubmit={handleSubmit} className="upload-form">
                            {/* Post Title */}
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Post Title"
                                required
                                className="upload-input"
                            />
    
                            {/* Caption */}
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Write a caption..."
                                required
                                className="upload-textarea"
                            />
    
                            {/* Image Upload */}
                            <label className="upload-file-label">
                                <i className="fas fa-upload"></i> Choose Image
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="upload-file-input"
                                />
                            </label>
    
                            {/* Image Preview */}
                            {imageFile && (
                                <div className="image-preview">
                                    <img
                                        src={URL.createObjectURL(imageFile)}
                                        alt="Preview"
                                        className="preview-image"
                                    />
                                    <button
                                        onClick={() => setImageFile(null)}
                                        className="remove-image-btn"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            )}
    
                            {/* Privacy Settings */}
                            <div className="privacy-options">
                                <label>Privacy:</label>
                                <select
                                    value={privacy}
                                    onChange={(e) => setPrivacy(e.target.value)}
                                    className="privacy-select"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
    
                            {/* Friend Tagging */}
                            <div className="tagging-friends">
                                <label>Tag Friends:</label>
                                <button type="button" onClick={() => handleTagFriend('User 2')}>Tag User 2</button>
                                <button type="button" onClick={() => handleTagFriend('User 3')}>Tag User 3</button>
    
                                <div className="tags">
                                    {taggedFriends.map((friend) => (
                                        <span key={friend} className="tag">
                                            {friend}
                                            <button 
                                                onClick={() => handleRemoveTag(friend)} 
                                                className="remove-tag-btn"
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
    
                            {/* Submit Button */}
                            <button type="submit" className="upload-submit-button">
                                <i className="fas fa-cloud-upload-alt"></i> Upload Post
                            </button>
                        </form>
                    </div>
                </div>
            )}
    
            <PostList posts={posts} userId={userId} />
        </div>
    );
    
};

export default UploadPost;
