import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
    
        if (storedUser && storedUser !== "undefined") {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                sessionStorage.removeItem("user"); // ✅ Prevent broken data from persisting
                navigate("/login");
            }
        } else {
            alert("No user session found. Redirecting to login.");
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        sessionStorage.clear(); // Clear user session on logout
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
