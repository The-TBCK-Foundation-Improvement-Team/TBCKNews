import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';
import '../css/Signup.css';
import { MuiCategoryBar } from '../components/MuiCategoryBar';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://tbckuserservice-env.eba-y8qwbxqf.us-east-2.elasticbeanstalk.com/user",
                { 
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    role: "GUEST",
                    verified: false
                },
                { withCredentials: true }
            );

            alert("Signup successful!");
            navigate("/login");

        } catch (error) {
            alert("Signup failed: " + (error.response?.data?.error || "Password Must Contain 1 Special Character"));
        }
    };

    return (
        <div>
            <MuiNavBar />
            <MuiCategoryBar />
        <div className="signup-container">
            
            <div className="signup-content">
                <h2>Sign Up</h2>
                <form className="signup-form" onSubmit={handleSignup}>
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
        </div>
    );
};

export default Signup;
