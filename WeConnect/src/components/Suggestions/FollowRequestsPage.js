import React, { useEffect, useState } from 'react';
import AuthService from '../Auth/AuthService';
import Navbar from '../Navbar'; // Import Navbar component
import Sidebar from '../Sidebar'; // Import Sidebar component
import Rsidebar from '../Rsidebar'; // Import Right Sidebar component

const FollowRequestsPage = () => {
    const [followRequests, setFollowRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log('User ID:', userId);  // Add this log to check if userId is present
        if (!userId) {
            setError('User not logged in');
            setLoading(false);
            return;
        }
    
        const fetchFollowRequests = async () => {
            try {
                const response = await AuthService.fetchReceivedFollowRequests(userId);
                console.log('Follow requests:', response);  // Log the response
                // Make sure response is an array
                const requests = Array.isArray(response) ? response : [];
                setFollowRequests(requests);  // Correctly set the follow requests data
            } catch (error) {
                setError('Error fetching follow requests');
                console.error('Fetch error:', error);  // Log the error in case of failure
            } finally {
                setLoading(false);
            }
        };
        fetchFollowRequests();
    }, []);
    
    
    const handleAccept = async (requestId) => {
        try {
            await AuthService.acceptFollowRequest(requestId);
            setFollowRequests(prev => prev.filter(req => req.id !== requestId));
            setSuccessMessage('Follow request accepted successfully!');
        } catch (error) {
            setError('Error accepting follow request');
        }
    };

    const handleDecline = async (requestId) => {
        try {
            await AuthService.declineFollowRequest(requestId);
            setFollowRequests(prev => prev.filter(req => req.id !== requestId));
            setSuccessMessage('Follow request declined successfully!');
        } catch (error) {
            setError('Error declining follow request');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Navbar /> {/* Navbar component */} 

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3 col-12">
                        <Sidebar /> {/* Sidebar component */}
                    </div>

                    {/* Profile Content */}
                    <div className="col-md-6 col-12">
                        <div className="container mt-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="text-dark font-weight-bold">Follow Requests</h2>
                            </div>

                            {/* Display success message */}
                            {successMessage && (
                                <div className="alert alert-success" role="alert">
                                    {successMessage}
                                </div>
                            )}

                            <ul className="list-unstyled">
                                {followRequests.length > 0 ? (
                                    followRequests.map(request => (
                                        <FollowRequestCard
                                            key={request.id}
                                            request={request}
                                            onAccept={() => handleAccept(request.id)}
                                            onDecline={() => handleDecline(request.id)}
                                        />
                                    ))
                                ) : (
                                    <p>No follow requests available.</p>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-md-3 col-12">
                        <Rsidebar /> {/* Right Sidebar component */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FollowRequestCard = ({ request, onAccept, onDecline }) => (
    <li className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
            <div className="user-img img-fluid flex-shrink-0">
                <img src="../assets/images/user/05.jpg" alt="story-img" className="rounded-circle avatar-40" loading="lazy" />
            </div>
            <div className="flex-grow-1 ms-3">
                <h6 className="mb-0">{request.senderUsername}</h6>
            </div>
        </div><br />
        <div className="d-flex align-items-center mt-2 mt-md-0">
            <div className="confirm-click-btn">
                <button onClick={onAccept} className="me-2 btn btn-success-subtle rounded confirm-btn p-1 lh-1">
                    <i className="material-symbols-outlined font-size-14">done</i>
                </button>
                <button onClick={onDecline} className="me-3 btn btn-danger-subtle rounded p-1 lh-1">
                    <i className="material-symbols-outlined font-size-14">close</i>
                </button>
            </div>
        </div>
    </li>
);

export default FollowRequestsPage;
