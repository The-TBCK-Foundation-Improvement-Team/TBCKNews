import React from 'react';
import { Link } from 'react-router-dom';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';
import '../css/Logsign.css';

const Signup = () => {
    return (
        <div>
        <MuiNavBar />
        <div className="container">
            
            <h2>Sign Up</h2>
            <form>
                <input type="text" placeholder="First name" required />
                <input type="text" placeholder="Last name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>
            <Link to="/Login">Have an account? Log in instead!</Link>
            
        </div>
        <MuiFooter />
        </div>
    );
};

export default Signup;
