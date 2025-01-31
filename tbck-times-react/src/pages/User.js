
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // ✅ Load user data from sessionStorage
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            alert("No user session found. Redirecting to login.");
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.clear(); // ✅ Clear user session on logout
        navigate("/login");
    };

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default User;
