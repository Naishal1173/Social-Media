import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';  // Import Navbar component
import Sidebar from '../Sidebar'; // Import Sidebar component
import Rsidebar from '../Rsidebar'; // Import Right Sidebar component

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log('Fetching profile for user ID:', userId);

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5053/api/user/profile/${userId}`);
                console.log("Fetched user profile data:", response.data);
                setUserProfile(response.data);
            } catch (error) {
                setError('Error fetching user profile');
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserProfile();
    }, []);

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
                            {userProfile ? (
                                <div className="profile-header profile-info">
                                    <div className="cover-container">
                                        <img 
                                            src="../assets/images/page-img/profile-bg1.jpg" 
                                            alt="profile-bg" 
                                            className="rounded img-fluid" 
                                            loading="lazy" 
                                            style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
                                        />
                                        <ul className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0 setting-profile">
                                            <li><a href="#" className="material-symbols-outlined">edit</a></li>
                                            <li><a href="#" className="material-symbols-outlined">settings</a></li>
                                        </ul>
                                    </div>

                                    <div className="profile-info py-5 px-md-5 px-3 d-flex align-items-center justify-content-between position-relative">
                                        <div className="social-links">
                                            
                                        </div>
                                        <div className="user-detail text-center mb-3">
                                            <div className="profile-detail">
                                                <h3>{userProfile.username}</h3>
                                            </div>
                                        </div>
                                        <div className="social-info">
                                            <ul className="social-data-block social-user-meta-list d-flex align-items-center justify-content-center list-inline p-0 m-0 gap-1">
                                                <li className="text-center">
                                                    <p className="mb-0">{userProfile.postsCount || 0}</p>
                                                    <h6 className="mb-0">Posts</h6>
                                                </li>
                                                <li className="text-center">
                                                    <p className="mb-0">{userProfile.followersCount || 0}</p>
                                                    <h6 className="mb-0">Followers</h6>
                                                </li>
                                                <li className="text-center">
                                                    <p className="mb-0">{userProfile.followingCount || 0}</p>
                                                    <h6 className="mb-0">Following</h6>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>No user profile found.</div>
                            )}
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

export default UserProfilePage;
