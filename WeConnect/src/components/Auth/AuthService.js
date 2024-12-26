import axios from 'axios';

const STORY_API_URL = 'http://localhost:5053/api/stories/';
const POST_API_URL = 'http://localhost:5053/api/post/';
const AUTH_API_URL = 'http://localhost:5053/api/user/';
const CHAT_API_URL = 'http://localhost:5053/api/chat/'; 
const NOTIFICATIONS_API_URL = 'http://localhost:5053/api/notifications/';

class AuthService {

    static async login(username, password) {
        const credentials = { Username: username, Password: password };
        try {
            // Ensure this POST request is correctly targeting the login route
            const response = await axios.post(`${AUTH_API_URL}login`, credentials, {
                headers: { 'Content-Type': 'application/json' },  // Ensure correct headers
            });
            const { userId, username: loggedInUsername } = response.data;
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', loggedInUsername);
            return { userId, loggedInUsername };
        } catch (error) {
            // Handle error and send a clear message back
            const errorMessage = error?.response?.data || error?.message || 'Login failed.';
            console.error('Login failed:', errorMessage);
            throw new Error(errorMessage);  // Ensure an error is thrown for handling in the component
        }
    }
    

    static logout() {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        console.log('User logged out successfully');
    }
    
    static async register(userData) {
        try {
          const response = await axios.post(`${AUTH_API_URL}register`, userData, {
            headers: { 'Content-Type': 'application/json' }
          });
          return response.data.message || "Registration successful. Please verify OTP.";
        } catch (error) {
          const errorMessage = error?.response?.data || 'Registration failed.';
          console.error('Registration failed:', errorMessage);
          throw new Error(errorMessage);
        }
      }
    
      // Verify OTP for a given mobile number
      static async verifyOTP(mobileNumber, otpCode) {
        try {
          const response = await axios.post(
            'http://localhost:5053/api/User/verify-otp',
            { mobileNumber, OTP: otpCode },
            { headers: { 'Content-Type': 'application/json' } }
          );
          return response.data.message || 'OTP verified successfully.';
        } catch (error) {
          const errorMessage =
            error?.response?.data?.message || 'OTP verification failed.';
          console.error('OTP verification failed:', errorMessage);
          throw new Error(errorMessage);
        }
      }
      
      static async fetchUserById(userId) {
        try {
          const response = await axios.get(`${AUTH_API_URL}${userId}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching user:', error.response?.data || error.message);
          throw error.response?.data || 'Error fetching user.';
        }
      }
    
      // Followers Methods
      static async getFollowers(userId) {
        try {
          const response = await axios.get(`${AUTH_API_URL}${userId}/followers`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          return response.data;
        } catch (error) {
          console.error('Failed to fetch followers:', error.response?.data || error.message);
          throw error.response?.data || 'Failed to fetch followers.';
        }
      }
    

    // Story methods
    static async getStoriesByUserId(userId) {
        try {
            const response = await axios.get(`${STORY_API_URL}user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user stories:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to fetch user stories.';
        }
    }

    static async uploadStory(userId, storyData) {
        try {
            const formData = new FormData();
            formData.append('file', storyData.image);
            formData.append('title', storyData.title);

            const response = await axios.post(`${STORY_API_URL}${userId}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Failed to upload story:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to upload story.';
        }
    }

    static async deleteStory(storyId) {
        try {
            const response = await axios.delete(`${STORY_API_URL}${storyId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to delete story:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to delete story.';
        }
    }

    // Post methods
    static async fetchPosts() {
        try {
            const response = await axios.get(POST_API_URL);
            
            // Assuming the response contains posts with usernames (modify backend if necessary)
            if (response.data) {
                return response.data;
            }
            return [];  // Return an empty array if no posts are found
        } catch (error) {
            console.error('Failed to fetch posts:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to fetch posts.';
        }
    }
    
    static async fetchPostsByUserId(userId) {
        try {
            const response = await axios.get(`${POST_API_URL}user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user posts:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to fetch user posts.';
        }
    }

    static async createPost(postData) {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.post(`${POST_API_URL}${userId}/create`, postData, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error('Failed to create post:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to create post.';
        }
    }

    static async deletePost(postId) {
        try {
            const response = await axios.delete(`${POST_API_URL}${postId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to delete post:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to delete post.';
        }
    }

    static async likePost(postId) {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.post(`${POST_API_URL}${postId}/like`, { UserId: userId });
            return response.data;
        } catch (error) {
            console.error('Failed to like post:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to like post.';
        }
    }

    static async commentOnPost(postId, commentData) {
        try {
            const response = await axios.post(`${POST_API_URL}${postId}/comment`, commentData);
            return response.data;
        } catch (error) {
            console.error('Failed to comment on post:', error.response?.data || error.message);
            throw error.response?.data || 'Failed to comment on post.';
        }
    }

    // New methods for follow suggestions and sending follow requests
    static async getFollowSuggestions(userId) {
        if (!userId) throw new Error("User ID is required for fetching follow suggestions.");

        try {
            const response = await axios.get(`${AUTH_API_URL}follow-suggestions/${userId}`);
            return response.data;  // Returning the list of follow suggestions
        } catch (error) {
            console.error("Error fetching follow suggestions:", error.response?.data || error.message);
            throw error;  // Rethrow to be caught in component
        }
    }

    static async sendFollowRequest(senderId, receiverId) {
        try {
            const response = await axios.post(`${AUTH_API_URL}send-follow-request`, { senderId, receiverId });
            return response.data;
        } catch (error) {
            console.error("Error sending follow request:", error.response?.data || error.message);
            throw error;
        }
    }
    static async fetchReceivedFollowRequests(userId) {
        const url = `${AUTH_API_URL}received-follow-requests/${userId}`;
        try {
            const response = await axios.get(url);
            if (response.data && Array.isArray(response.data.followRequests)) {
                return response.data.followRequests;  // Ensure it's an array
            }
            return [];
        } catch (error) {
            console.error('Error fetching follow requests:', error.response?.data || error.message);
            throw error.response?.data || 'Error fetching follow requests.';
        }
    }
    

    static async acceptFollowRequest(requestId) {
        try {
            const response = await axios.post(`${AUTH_API_URL}accept-follow-request/${requestId}`);
            return response.data; // Return the updated data or success message
        } catch (error) {
            console.error('Error accepting follow request:', error);
            throw error.response?.data || 'Error accepting follow request.';
        }
    }

    static async declineFollowRequest(requestId) {
        try {
            const response = await axios.delete(`${AUTH_API_URL}decline-follow-request/${requestId}`);
            return response.data; // Return the updated data or success message
        } catch (error) {
            console.error('Error declining follow request:', error);
            throw error.response?.data || 'Error declining follow request.';
        }
    }

    // Fetch users for chat
static async fetchUsersForChat(userId) {
    try {
        const response = await axios.get(`${CHAT_API_URL}users/${userId}`);
        return response.data; // This will now return only the followed users
    } catch (error) {
        if (error.response?.status === 404) {
            console.warn("No users found for chatting.");
            return [];
        }
        console.error("Error fetching users for chat:", error);
        throw error;
    }
}

// Start a new chat
static async startChat(userIds) {
    try {
        // Ensure the initiating user follows the others
        const response = await axios.post(`${CHAT_API_URL}start`, userIds, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Error starting chat:", error);
        throw error;
    }
}
    static async getNotifications(userId) {
        try {
          const response = await axios.get(`${NOTIFICATIONS_API_URL}${userId}/notifications`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
            },
          });
          return response.data;
        } catch (error) {
          console.error('Failed to fetch notifications:', error.response?.data || error.message);
          throw error.response?.data || 'Failed to fetch notifications.';
        }
      }
    
      // Mark a notification as read
      static async markAsRead(notificationId) {
        try {
          const response = await axios.put(`${NOTIFICATIONS_API_URL}${notificationId}/read`, null, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          return response.data; // Return success message or updated notification data
        } catch (error) {
          console.error('Failed to mark notification as read:', error.response?.data || error.message);
          throw error.response?.data || 'Failed to mark notification as read.';
        }
      }
    
      // Delete a notification
      static async deleteNotification(notificationId) {
        try {
          const response = await axios.delete(`${NOTIFICATIONS_API_URL}${notificationId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          return response.data; // Return success message
        } catch (error) {
          console.error('Failed to delete notification:', error.response?.data || error.message);
          throw error.response?.data || 'Failed to delete notification.';
        }
      }
}

export default AuthService;
