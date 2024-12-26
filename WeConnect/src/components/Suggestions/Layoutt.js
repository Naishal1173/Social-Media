import React from 'react';
import FollowSuggestions from './FollowSuggestions';
import FriendRequests from './FriendRequests';
import UserProfile from './UserProfile';

const Layoutt = ({ userId }) => {
    return (
        <div className="layout">
            <UserProfile userId={userId} />
            <FollowSuggestions userId={userId} />
            <FriendRequests userId={userId} />
        </div>
    );
};

export default Layoutt;
