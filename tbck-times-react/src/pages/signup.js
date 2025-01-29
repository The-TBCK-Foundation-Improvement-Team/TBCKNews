import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';
import '../css/Logsign.css';
const API_BASE_URL = "http://localhost:8080";

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/user/signup`, 
                { 
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    role: "guest",
                    verified: false
                },
                { withCredentials: true }
            );

            if (response.status === 200 || response.status === 201) {
                setSuccess(response.data.message || "Signup successful! You can now log in.");
            } else {
                setError("Unexpected response from server.");
            }
        } catch (err) {
            console.error("Signup Error:", err);
            setError(err.response?.data?.error || "Signup failed. Please try again.");
        }
    };

    return (
        <div>
            <MuiNavBar />
            <div className="content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
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
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <button type="submit">Sign Up</button>
                </form>
                <Link to="/Login">Have an account? Log in instead!</Link>
            </div>
            <MuiFooter />
        </div>
    );
};

export default Signup;
