import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostItem.css';

const PostItem = ({ post, userId }) => {
    const [commentContent, setCommentContent] = useState('');
    const [comments, setComments] = useState([]);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        fetchComments();
        fetchLikeCount();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5053/api/post/${post.id}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const fetchLikeCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5053/api/post/${post.id}/likes`);
            setLikeCount(response.data.totalLikes);
        } catch (error) {
            console.error('Error fetching like count:', error);
        }
    };

    const handleLikePost = async () => {
        try {
            await axios.post(`http://localhost:5053/api/post/${post.id}/like`, { userId }, {
                headers: { 'Content-Type': 'application/json' },
            });
            fetchLikeCount();
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const toggleCommentBox = () => setShowCommentBox(!showCommentBox);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5053/api/post/${post.id}/comment`, {
                content: commentContent,
                userId,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });
            setCommentContent('');
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="post-item-wrapper">
            <p className="post-author" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                Posted by: <span className="author-username">{post.user?.username || 'Unknown User'}</span>
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
    <p style={{ fontWeight: 'bold', marginBottom: '0',fontSize:'15px' }}>Title:</p>
    <h3 className="post-title" style={{ color: '#333', marginBottom: '0',paddingRight: '400px',fontSize:'14px' }}>
        {post.title}
    </h3>
</div>

            <img
                src={`http://localhost:5053${post.imagePath}`}
                alt={post.title}
                className="post-image"
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '15px',
                }}
            />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
    <p style={{ fontWeight: 'bold', marginBottom: '0', fontSize: '14px' }}>Caption:</p>
    <p className="post-caption" style={{ 
    fontSize: '13px', 
    lineHeight: '1.2', 
    color: '#333', 
    marginBottom: '0', 
    paddingRight: '355px', 
    paddingLeft : '5px',
    whiteSpace: 'nowrap', 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
    display: 'flex', 
    alignItems: 'center' 
}}>
    {post.caption}
</p>

</div>



            {/* Display Tagged Users (Static + Dynamic) */}
            <div className="tagged-users" style={{ marginBottom: '20px' }}>
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>Tagged:</span>
                <span
                    className="tagged-user"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginRight: '10px',
                        backgroundColor: '#f0f0f0',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '14px',
                    }}
                >
                    <i
                        className="fas fa-user-tag"
                        style={{ color: '#007bff', marginRight: '5px' }}
                    ></i>
                    User 2
                </span>
                <span
                    className="tagged-user"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginRight: '10px',
                        backgroundColor: '#f0f0f0',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '14px',
                    }}
                >
                    <i
                        className="fas fa-user-tag"
                        style={{ color: '#007bff', marginRight: '5px' }}
                    ></i>
                    User 3
                </span>
                {post.taggedUsers?.map((user, index) => (
                    <span
                        key={index}
                        className="tagged-user"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            marginRight: '10px',
                            backgroundColor: '#f0f0f0',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            fontSize: '14px',
                        }}
                    >
                        <i
                            className="fas fa-user-tag"
                            style={{ color: '#007bff', marginRight: '5px' }}
                        ></i>
                        {user}
                    </span>
                ))}
            </div>

            <div className="post-actions" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <button
    onClick={handleLikePost}
    className="like-button medium" // Change "medium" to "small" or "large" as needed
>
    <i className="fas fa-heart" style={{ marginRight: '5px' }}></i> Like
</button>

                <span
                    className="like-count"
                    style={{ marginRight: '20px', fontWeight: 'bold', color: '#333' }}
                >
                    {likeCount} Likes
                </span>
                <button
                    onClick={toggleCommentBox}
                    className="comment-button"
                    style={{
                        background: '#1e90ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 9px',
                        cursor: 'pointer',
                        fontSize:'17px',
                    }}
                >
                    <i className="fas fa-comment" style={{ marginRight: '5px' }}></i> Comment
                </button>
            </div>

            {comments.map((comment, index) => (
                <div
                    key={index}
                    className="comment-item"
                    style={{
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <span className="comment-author" style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Comment {index + 1}:
                    </span>
                    <p style={{ margin: '5px 0' }}>{comment.content}</p>
                </div>
            ))}

            {showCommentBox && (
                <form onSubmit={handleCommentSubmit} style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Add a comment..."
                        required
                        style={{
                            width: '80%',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            marginRight: '10px',
                        }}
                    />
                    <button
    type="submit"
    style={{
        padding: '10px 20px',
        fontSize: '16px', // Use camelCase for CSS properties
        border: 'none',
        borderRadius: '8px',
        background: '#28a745',
        color: 'white',
        cursor: 'pointer',
    }}
>
    Comment
</button>

                </form>
            )}
        </div>
    );
};

export default PostItem;
