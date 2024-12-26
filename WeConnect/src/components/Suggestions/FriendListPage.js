import React, { useEffect, useState } from 'react';
import AuthService from '../Auth/AuthService';

const FriendListPage = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User not logged in');
            setLoading(false);
            return;
        }

        const fetchFollowers = async () => {
            try {
                const response = await AuthService.fetchFollowers(userId);
                setFollowers(response);
            } catch (error) {
                setError('Error fetching followers: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Friend List</h2><br /><br />
            <ul className="list-unstyled">
                {followers.length > 0 ? (
                    followers.map(follower => (
                        <FriendCard
                            key={follower.id}
                            follower={follower}
                        />
                    ))
                ) : (
                    <p>No followers available.</p>
                )}
            </ul>
        </div>
    );
};

const FriendCard = ({ follower }) => (
    <li className="d-flex align-items-center mb-3">
        <div className="d-flex align-items-center">
            <div className="user-img img-fluid flex-shrink-0">
                <img src="../assets/images/user/05.jpg" alt="user-img" className="rounded-circle avatar-40" loading="lazy" />
            </div>
            <div className="flex-grow-1 ms-3">
                <h6>{follower.username}</h6>
            </div>
        </div>
    </li>
);

export default FriendListPage;
