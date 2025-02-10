import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../css/Admin.css';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiCategoryBar } from '../components/MuiCategoryBar';
import { MuiFooter } from '../components/MuiFooter.js';

const Admin = () => {
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [articles, setArticles] = useState([
        { id: 1, title: "The Rise of Tech in 2025", author: "Jane Doe", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { id: 2, title: "Climate Change and Its Effects", author: "John Smith", content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 3, title: "AI in Modern Healthcare", author: "Emily Clark", content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
        { id: 4, title: "The Future of Space Exploration", author: "Alan Turing", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore." }
    ]);

    const fetchUnverifiedUsers = async () => {
        try {
            const token = sessionStorage.getItem("jwt");
            const response = await axios.get("http://localhost:8080/user/unverified", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUnverifiedUsers(response.data);
        } catch (error) {
            console.error("Error fetching unverified users:", error);
        }
    };

    useEffect(() => {
        fetchUnverifiedUsers();
    }, []);

    const verifyUser = async (userId) => {
        try {
            const token = sessionStorage.getItem("jwt");
            const role = "USER"; // Assign the 'USER' role upon verification

            await axios.patch(`http://localhost:8080/user/verify/${userId}/${role}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUnverifiedUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
            alert("User verified successfully!");
        } catch (error) {
            console.error("Error verifying user:", error);
            alert("Failed to verify user.");
        }
    };

    const approveArticle = (id) => {
        setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
        alert(`Article ID ${id} approved.`);
    };

    const rejectArticle = (id) => {
        setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
        alert(`Article ID ${id} rejected.`);
    };

    return (
        <div>
            <MuiNavBar />
            <MuiCategoryBar />
        <div className="admin-container">
            {/* User Verification Section */}
            <div className="verification-container scrollable-container">
                <h2>Unverified Users</h2>
                {unverifiedUsers.length > 0 ? (
                    unverifiedUsers.map(user => (
                        <div key={user.userId} className="user-card">
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <div className="button-group">
                                <button className="approve" onClick={() => verifyUser(user.userId)}>Verify</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No unverified users.</p>
                )}
            </div>

            {/* Article Submission Verification Section */}
            <div className="verification-container scrollable-container">
                <h2>Article Submissions</h2>
                {articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article.id} className="article-card">
                            <h3>{article.title}</h3>
                            <p><strong>Author:</strong> {article.author}</p>
                            <p>{article.content}</p>
                            <div className="button-group">
                                <button className="approve" onClick={() => approveArticle(article.id)}>Approve</button>
                                <button className="reject" onClick={() => rejectArticle(article.id)}>Reject</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No pending articles.</p>
                )}
            </div>
        </div>
        <MuiFooter />
        </div>
    );
};

export default Admin;
