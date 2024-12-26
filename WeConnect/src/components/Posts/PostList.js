import React from 'react';
import PostItem from './PostItem';
import './PostList.css';

const PostList = ({ posts, userId }) => {
    return (
        <div className="post-list-wrapper">
            <h2 className="post-list-title">Posts</h2>
            {posts.length > 0 ? (
                posts.map(post => (
                    <PostItem key={post.id} post={post} userId={userId} />
                ))
            ) : (
                <p className="no-posts-message">No posts available.</p>
            )}
        </div>
    );
};

export default PostList;
