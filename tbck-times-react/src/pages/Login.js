import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';

import '../css/Logsign.css';

const API_BASE_URL = "http://localhost:8080";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required.");
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/user/login`, 
                { email: email.trim(), password: password.trim() },
                { withCredentials: true }
            );
            alert("Login successful!");
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data || "Invalid credentials. Please try again.");
            console.error(err);
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
