import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/authenticate/login", {
                email,
                password
            }, { withCredentials: true });
    
            console.log("Login Response:", response.data); // ✅ Debugging output
    
            const { token, user } = response.data; // ✅ Extract both values
            sessionStorage.setItem("jwt", token);  // ✅ Store JWT
            sessionStorage.setItem("user", JSON.stringify(user)); // ✅ Store user data
    
            alert("Login successful!");
            navigate("/user");
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed: " + (error.response?.data?.error || "Unknown error"));
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
                    <button type="submit">Log In</button>
                </form>
                <Link to="/Signup">Don't have an account? Sign up instead!</Link>
            </div>
            <MuiFooter />
        </div>
    );
};

export default Login;
