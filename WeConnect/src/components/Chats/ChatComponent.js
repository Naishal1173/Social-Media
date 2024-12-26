import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AuthService from '../Auth/AuthService';

const ChatComponent = ({ isStoryViewOpen }) => {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [receiverId, setReceiverId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch user ID from localStorage
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(Number(storedUserId));
        } else {
            console.error("No user ID found in localStorage.");
        }
    }, []);

    // Fetch followed users for chat
    useEffect(() => {
        if (userId) {
            setLoading(true);
            AuthService.fetchUsersForChat(userId)
                .then((data) => {
                    setUsers(data || []);
                    setError(null);
                })
                .catch((err) => {
                    setError("Failed to fetch users.");
                    console.error("Error fetching users:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userId]);

    // Start a new chat
    const startChat = async (selectedUserId) => {
        setReceiverId(selectedUserId);
        setLoading(true);
        try {
            const chatId = await AuthService.startChat([userId, selectedUserId]);
            setCurrentChatId(chatId);
            fetchChatMessages(chatId);
        } catch (err) {
            setError("Failed to start chat.");
            console.error("Error starting chat:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch chat messages
    const fetchChatMessages = useCallback((chatId) => {
        if (!chatId) return;
        axios
            .get(`http://localhost:5053/api/chat/${chatId}`)
            .then((response) => {
                const messageData = response.data || [];
                const updatedMessages = messageData.map((message) => {
                    const sender = users.find((user) => user.id === message.senderId);
                    const receiver = users.find((user) => user.id === message.receiverId);
                    return {
                        ...message,
                        senderUsername: sender ? sender.username : 'Unknown Sender',
                        receiverUsername: receiver ? receiver.username : 'Unknown Receiver',
                    };
                });
                setMessages(updatedMessages);
            })
            .catch((err) => {
                setError("Failed to fetch messages.");
                console.error("Error fetching messages:", err);
            });
    }, [users]);

    // Send a message
    const sendMessage = async () => {
        if (!messageText.trim()) {
            setError("Message text is required.");
            return;
        }
        if (!receiverId || !userId) {
            setError("Valid SenderId and ReceiverId are required.");
            return;
        }

        const messageData = {
            SenderId: userId,
            ReceiverId: receiverId,
            Text: messageText,
        };

        try {
            setLoading(true);
            await axios.post('http://localhost:5053/api/chat/message', messageData);
            setMessageText('');
            setError(null);
            fetchChatMessages(currentChatId);
        } catch (err) {
            setError("Error sending message.");
            console.error("Error sending message:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    const closeChat = () => {
        setCurrentChatId(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        setMessages([]);
    }, [receiverId, currentChatId]);

    const getProfileImage = (userId) => {
        return `https://randomuser.me/api/portraits/men/${userId % 100}.jpg`;
    };

    return (
        <div className="chat-container">
            {/* Right Sidebar Toggle Button */}
            {!isStoryViewOpen && (
                <div
                    className="right-sidebar-toggle bg-primary text-white mt-3 d-flex"
                    onClick={toggleSidebar}
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        padding: '10px',
                        zIndex: 9999,
                        paddingTop:'10px',
                    }}
                >
                    <span className="material-symbols-outlined">chat</span>
                </div>
            )}

            {/* Chat Sidebar */}
            {sidebarVisible && !isStoryViewOpen && (
                <div className="right-sidebar-mini right-sidebar">
                    <div className="right-sidebar-panel p-0">
                        <div className="card shadow-none m-0 h-100">
                            <div className="card-body px-0 pt-0">
                                <div className="p-4">
                                    <h6 className="fw-semibold m-0">Chats</h6>
                                    <div className="mt-4 iq-search-bar device-search">
                                    <form
                                    className="searchbox"
                                    style={{
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'center',
                                        maxWidth: '400px',
                                        width: '190px',
                                        margin: '0 20px',
                                        padding: '5px',
                                        backgroundColor: '#f8f9fa', // 'bg-light-subtle' equivalent
                                        borderRadius: '25px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    }}
                                    >
                                    <input
                                        type="text"
                                        className="search-input"
                                        style={{
                                        width: '100%',
                                        padding: '15px 15px',
                                        border: 'none',
                                        outline: 'none',
                                        borderRadius: '25px',
                                        fontSize: '14px',
                                        backgroundColor: 'transparent',
                                        }}
                                        placeholder="Search for peoples..."
                                    />
                                    </form>

                                    </div>
                                </div>
                                <div className="media-height" data-scrollbar="init">
                                    <div className="tab-content right-sidebar-tabs-content">
                                        <div className="tab-pane fade show active" id="nav-friends">
                                            {loading ? (
                                                <p>Loading users...</p>
                                            ) : users.length > 0 ? (
                                                users.map((user) => (
                                                    <div
                                                        key={user.id}
                                                        className="d-flex align-items-center justify-content-between chat-tabs-content border-bottom"
                                                        onClick={() => startChat(user.id)}
                                                    >
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="iq-profile-avatar status-online">
                                                                <img
                                                                    className="rounded-circle avatar-50"
                                                                    src={getProfileImage(user.id)}
                                                                    alt="user-img"
                                                                    loading="lazy"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h6 className="font-size-14 mb-0 fw-semibold">{user.username}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No users available for chat.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Window */}
            {currentChatId && (
                <div className="chat-popup-modal show" id="chat-popup-modal">
                    {/* Chat Header */}
                    <div className="bg-primary p-3 d-flex align-items-center justify-content-between gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className="image flex-shrink-0">
                                <img
                                    src={getProfileImage(receiverId)}
                                    alt="img"
                                    className="img-fluid avatar-45 rounded-circle object-cover"
                                />
                            </div>
                            <div className="content">
                                <h6 className="mb-0 font-size-14 text-white">
                                    {users.find((user) => user.id === receiverId)?.username || 'Unknown User'}
                                </h6>
                                <span className="d-inline-block lh-1 font-size-12 text-white">
                                    <span className="d-inline-block rounded-circle bg-success border-5 p-1 align-baseline me-1"></span>
                                    Available
                                </span>
                            </div>
                        </div>
                        <div>
                            <button
                                className="btn-close text-white"
                                type="button"
                                aria-label="Close"
                                onClick={closeChat}
                            ></button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="chat-popup-body p-3 position-relative" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.senderId === userId ? 'message-right' : 'message-left'}`}
                                style={{
                                    display: 'flex',
                                    flexDirection: msg.senderId === userId ? 'row-reverse' : 'row',
                                    marginBottom: '10px',
                                }}
                            >
                                <p
                                    style={{
                                        backgroundColor: msg.senderId === userId ? '#0084FF' : '#f1f0f0',
                                        color: msg.senderId === userId ? '#fff' : '#000',
                                        padding: '10px',
                                        borderRadius: '20px',
                                        maxWidth: '70%',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {msg.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="chat-popup-footer">
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type your message..."
                            />
                            <button
                                className="btn btn-primary ms-2"
                                onClick={sendMessage}
                                disabled={loading}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;
