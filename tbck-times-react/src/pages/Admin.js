import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Admin.css";

const API_BASE_URL = "http://localhost:8080";

const Admin = () => {
    const navigate = useNavigate();
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0); // Track displayed user

    useEffect(() => {
        fetchUnverifiedUsers();
    }, []);

    const fetchUnverifiedUsers = async () => {
        try {
            const token = sessionStorage.getItem("jwt"); // Get JWT token
            const response = await axios.get(`${API_BASE_URL}/user/unverified`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUnverifiedUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching unverified users:", error);
            alert("Error fetching unverified users.");
            setLoading(false);
        }
    };

    const handleVerifyUser = async (userId) => {
        try {
            const token = sessionStorage.getItem("jwt");
            await axios.patch(`${API_BASE_URL}/user/verify/${userId}/GUEST`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("User verified successfully!");
            fetchUnverifiedUsers(); // Refresh user list
        } catch (error) {
            console.error("Error verifying user:", error);
            alert("Failed to verify user.");
        }
    };

    const handleRejectUser = (userId) => {
        if (window.confirm("Are you sure you want to reject this user?")) {
            deleteUser(userId);
        }
    };

    const deleteUser = async (userId) => {
        try {
            const token = sessionStorage.getItem("jwt");
            await axios.delete(`${API_BASE_URL}/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("User rejected and deleted.");
            fetchUnverifiedUsers(); // Refresh user list
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    const handleNextUser = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % unverifiedUsers.length);
    };

    const handlePreviousUser = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + unverifiedUsers.length) % unverifiedUsers.length);
    };

    return (
        <div className="admin-container">
            <h2>Admin Panel - Approve Users</h2>
            {loading ? (
                <p>Loading unverified users...</p>
            ) : unverifiedUsers.length === 0 ? (
                <p>No unverified users found.</p>
            ) : (
                <div className="user-card">
                    <h3>{unverifiedUsers[currentIndex].firstName} {unverifiedUsers[currentIndex].lastName}</h3>
                    <p><strong>Email:</strong> {unverifiedUsers[currentIndex].email}</p>
                    <div className="button-group">
                        <button className="approve" onClick={() => handleVerifyUser(unverifiedUsers[currentIndex].userId)}>Approve</button>
                        <button className="reject" onClick={() => handleRejectUser(unverifiedUsers[currentIndex].userId)}>Reject</button>
                    </div>
                    {unverifiedUsers.length > 1 && (
                        <div className="navigation">
                            <button onClick={handlePreviousUser}>Previous</button>
                            <button onClick={handleNextUser}>Next</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Admin;
