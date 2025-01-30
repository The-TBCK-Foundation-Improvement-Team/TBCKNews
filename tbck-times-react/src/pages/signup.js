import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // ✅ Import this
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';
import '../css/Logsign.css';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  // ✅ Define navigate

    const handleSignup = async (event) => {
        event.preventDefault();  // ✅ Prevent default form submission
        try {
            const response = await axios.post(
                "http://localhost:8080/user",
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

            alert("Signup successful!");
            navigate("/login");  // ✅ Redirect to login page after signup

        } catch (error) {
            alert("Signup failed: " + (error.response?.data?.error || "Unknown error"));
        }
    };

    return (
        <div>
            <MuiNavBar />
            <div className="content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>  {/* ✅ Add onSubmit */}
                    <input 
                        type="text" 
                        placeholder="First name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Last name" 
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
                    <button type="submit">Sign Up</button>
                </form>
                <Link to="/Login">Already have an account? Log in!</Link>
            </div>
            <MuiFooter />
        </div>
    );
};

export default Signup;
