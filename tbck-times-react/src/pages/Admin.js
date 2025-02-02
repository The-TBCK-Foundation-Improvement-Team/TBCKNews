import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Admin.css";

const Admin = () => {
    const navigate = useNavigate();
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);

    // ✅ Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const jwt = sessionStorage.getItem("jwt");
            console.log("JWT Token:", jwt); // Debugging

            if (!jwt) {
                console.error("No JWT token found");
                alert("Access denied. Redirecting to login.");
                navigate("/login");
                return;
            }

            const response = await axios.get("http://localhost:8080/user", {
                headers: { Authorization: `Bearer ${jwt}` },
                withCredentials: true,
            });

            console.log("Full API Response:", response.data); // Debugging

            const users = response.data;
            const filteredUsers = users.filter((user) => !user.verified);
            setUnverifiedUsers(filteredUsers);
        } catch (error) {
            console.error("Error fetching users:", error.response || error.message);
            if (error.response?.status === 403) {
                alert("Access denied: You are not authorized to view this page.");
                navigate("/user"); // Redirect non-admin users
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ✅ Handle user verification
    const handleVerifyUser = async () => {
        if (unverifiedUsers.length === 0) {
            alert("No unverified users remaining.");
            return;
        }

        const userToVerify = unverifiedUsers[currentUserIndex];

        try {
            const jwt = sessionStorage.getItem("jwt");
            const response = await axios.patch(
                `http://localhost:8080/user/verify/${userToVerify.userId}/guest`,
                {},
                { headers: { Authorization: `Bearer ${jwt}` }, withCredentials: true }
            );

            console.log("User verified:", response.data);
            alert(`User ${userToVerify.email} verified successfully!`);

            // ✅ Remove the verified user from the array and move to the next one
            setUnverifiedUsers((prevUsers) => prevUsers.filter((user, index) => index !== currentUserIndex));
        } catch (error) {
            console.error("Error verifying user:", error.response || error.message);
            alert("Failed to verify user.");
        }
    };

    // ✅ Move to next unverified user
    const handleNextUser = () => {
        if (unverifiedUsers.length === 0) {
            alert("No more unverified users.");
            return;
        }
        setCurrentUserIndex((prevIndex) => (prevIndex + 1) % unverifiedUsers.length);
    };

    return (
        <div className="admin-container">
            <h2>Admin Panel</h2>
            {unverifiedUsers.length > 0 ? (
                <div className="user-card">
                    <p><strong>First Name:</strong> {unverifiedUsers[currentUserIndex]?.firstName}</p>
                    <p><strong>Last Name:</strong> {unverifiedUsers[currentUserIndex]?.lastName}</p>
                    <p><strong>Email:</strong> {unverifiedUsers[currentUserIndex]?.email}</p>
                    <button onClick={handleVerifyUser}>Verify User</button>
                    <button onClick={handleNextUser}>Next User</button>
                </div>
            ) : (
                <p>No unverified users found.</p>
            )}
        </div>
    );
};

export default Admin;
