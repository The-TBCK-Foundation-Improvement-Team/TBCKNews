import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/User.css";

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
                setEditedUser(parsedUser); // ✅ Initialize edit fields
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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const jwtToken = sessionStorage.getItem("jwt");

            const response = await axios.patch(
                `http://localhost:8080/user/${user.userId}`, // ✅ Backend API to update user
                editedUser,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            setUser(response.data); // ✅ Update UI with new data
            sessionStorage.setItem("user", JSON.stringify(response.data)); // ✅ Save updated user data
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

    return (
        <div className="user-container">
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p><strong>First Name:</strong> 
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="firstName" 
                                value={editedUser.firstName} 
                                onChange={handleChange} 
                            />
                        ) : user.firstName}
                    </p>
                    <p><strong>Last Name:</strong> 
                        {isEditing ? (
                            <input 
                                type="text" 
                                name="lastName" 
                                value={editedUser.lastName} 
                                onChange={handleChange} 
                            />
                        ) : user.lastName}
                    </p>
                    <p><strong>Email:</strong> 
                        {isEditing ? (
                            <input 
                                type="email" 
                                name="email" 
                                value={editedUser.email} 
                                onChange={handleChange} 
                            />
                        ) : user.email}
                    </p>
                    <p><strong>Password:</strong> 
                        {isEditing ? (
                            <input 
                                type="password" 
                                name="password" 
                                value={editedUser.password} 
                                onChange={handleChange} 
                            />
                        ) : "********"}
                    </p>

                    {message && <p className="message">{message}</p>}

                    {isEditing ? (
                        <button onClick={handleSave}>Save Changes</button>
                    ) : (
                        <button onClick={handleEdit}>Edit Profile</button>
                    )}
                    
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default User;
