import React from "react";
import { useAuth } from "../Auth/AuthContext";  // Ensure this path is correct
import AuthService from "./AuthService";  // Ensure AuthService is implemented

import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();  

    const handleLogout = () => {
        AuthService.logout();
        logout();
        alert('logout');
        navigate("/login"); 
    };

    return (
        <button className="btn btn-link" onClick={handleLogout}>
            Logout
        </button>
    );
};


export default Logout;
