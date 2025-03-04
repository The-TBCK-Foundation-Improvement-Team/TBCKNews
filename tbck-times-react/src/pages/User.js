import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MuiCategoryBar } from '../components/MuiCategoryBar.js';
import { MuiNavBar } from '../components/MuiNavBar.js';
import "../css/User.css";
import { MuiFooter } from "../components/MuiFooter.js";

const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setEditedUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                sessionStorage.removeItem("user");
                navigate("/login");
            }
        } else {
            alert("No user session found. Redirecting to login.");
            navigate("/login");
        }
    }, [navigate]);

    const handleEdit = () => setIsEditing(true);

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const jwtToken = sessionStorage.getItem("jwt");
            const response = await axios.patch(
                `http://localhost:8080/user/${user.userId}`,
                editedUser,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            setUser(response.data);
            sessionStorage.setItem("user", JSON.stringify(response.data));
            setIsEditing(false);
            setMessage("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating user:", error);
            setMessage("Failed to update profile.");
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    const handleAdminRedirect = () => {
        navigate("/admin");
    };

    return (
        <div>
            <MuiNavBar />
            <MuiCategoryBar />
            <div className="user-container">
                <h2>User Profile</h2>
                {user ? (
                    <div>
                        <p><strong>First Name:</strong> {isEditing ? <input type="text" className="userInput" name="firstName" value={editedUser.firstName} onChange={handleChange} /> : user.firstName}</p>
                        <p><strong>Last Name:</strong> {isEditing ? <input type="text" className="userInput" name="lastName" value={editedUser.lastName} onChange={handleChange} /> : user.lastName}</p>
                        <p><strong>Email:</strong> {isEditing ? <input type="email" className="userInput" name="email" value={editedUser.email} onChange={handleChange} /> : user.email}</p>
                        <p><strong>Password:</strong> {isEditing ? <input type="password" className="userInput" name="password" value={editedUser.password} onChange={handleChange} /> : "********"}</p>

                        {message && <p className="message">{message}</p>}

                        {isEditing ? (
                            <button className="save-btn" onClick={handleSave}>Save Changes</button>
                        ) : (
                            <button className="edit-btn" onClick={handleEdit}>Edit Profile</button>
                        )}

                        {user.role === "ADMIN" && (
                            <button onClick={handleAdminRedirect} className="admin-btn">Go to Admin Page</button>
                        )}

                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <MuiFooter />
        </div>
    );
};

export default User;
