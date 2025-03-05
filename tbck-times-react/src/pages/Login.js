import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';
import '../css/Login.css';
import { MuiCategoryBar } from '../components/MuiCategoryBar';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://tbckuserservice-env.eba-y8qwbxqf.us-east-2.elasticbeanstalk.com/authenticate/login", {
                email,
                password
            }, { withCredentials: true });

            console.log("Login Response:", response.data);

            const { token, ...user } = response.data;
            sessionStorage.setItem("jwt", token);
            sessionStorage.setItem("user", JSON.stringify(user));

            alert("Login successful!");
            navigate("/User");
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed: " + (error.response?.data?.error || "Unknown error"));
        }
    };

    return (
        <div>
        <MuiNavBar />
        <MuiCategoryBar />
        <div className="login-container">
            
            <div className="login-content">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleLogin}>
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
                    <button type="submit">Log In</button>
                </form>
                <Link to="/Signup">Don't have an account? Sign up instead!</Link>
            </div>
            <MuiFooter />
        </div>
        </div>
    );
};

export default Login;
