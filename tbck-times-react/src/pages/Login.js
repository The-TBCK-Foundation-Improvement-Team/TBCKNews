import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';
import '../css/Logsign.css';

const API_BASE_URL = "http://localhost:8080";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // ✅ State for handling errors
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); // ✅ Prevent default form submission

        try {
            const response = await axios.post(`${API_BASE_URL}/user/login`, {
                email,
                password
            }, { withCredentials: true });

            const userData = response.data; // Backend should return user details

            // ✅ Store user data in sessionStorage (clears when browser closes)
            sessionStorage.setItem("user", JSON.stringify(userData));

            alert("Login successful!");
            navigate("/user"); // ✅ Redirect to User Page
        } catch (err) {
            if (err.response?.status === 403) {
                setError("Login failed: Account not verified.");
            } else if (err.response?.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError("Login failed: " + (err.response?.data || "Unknown error"));
            }
        }
    };

    return (
        <div>
            <MuiNavBar />
            <div className="content">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Log In</button>
                </form>
                <Link to="/Signup">Don't have an account? Sign up instead!</Link>
            </div>
            <MuiFooter />
        </div>
    );
};

export default Login;
