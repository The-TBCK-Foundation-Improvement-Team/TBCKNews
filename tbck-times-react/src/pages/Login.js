import React from 'react';
import { Link } from 'react-router-dom';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiFooter } from '../components/MuiFooter';
//import '../css/Logsign.css';

const Login = () => {
    return (
      <div>
      <MuiNavBar />
        <div className="content">
            <h2>Login</h2>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log In</button>
            </form>
            <Link to="/Signup">Don't have an account? Sign up instead!</Link>
            
        </div>
        <MuiFooter />
        </div>
    );
};

export default Login;
