import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiCategoryBar } from '../components/MuiCategoryBar';
import { MuiFooter } from '../components/MuiFooter';
import '../css/Admin.css';

const Admin = () => {
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [articleData, setArticleData] = useState({
        title: '',
        content: '',
        author: '',
        date: '',
        category: '',
        template: 'Generic',
        images: [],
        comments: []
    });
    const [imageFiles, setImageFiles] = useState([]);

    // ✅ Fetch Unverified Users
    const fetchUnverifiedUsers = async () => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await axios.get('http://localhost:8080/user/unverified', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUnverifiedUsers(response.data);
        } catch (error) {
            console.error('Error fetching unverified users:', error);
        }
    };

    useEffect(() => {
        fetchUnverifiedUsers();
    }, []);

    // ✅ Verify User
    const verifyUser = async (userId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            await axios.patch(`http://localhost:8080/user/verify/${userId}/ADMIN`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchUnverifiedUsers();
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    // ✅ Handle Image Uploads
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const updatedFiles = files.map(file => ({
            file,
            altText: '',
            caption: ''
        }));
        setImageFiles(prev => [...prev, ...updatedFiles]);
    };

    const handleImageDetailsChange = (index, field, value) => {
        const updatedFiles = [...imageFiles];
        updatedFiles[index][field] = value;
        setImageFiles(updatedFiles);
    };

    const uploadImages = async () => {
        const token = sessionStorage.getItem('jwt');
        const formData = new FormData();
        imageFiles.forEach(img => formData.append('images', img.file));

        try {
            const response = await axios.post('http://localhost:8081/image/add/many', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data.map((url, index) => ({
                imageId: '',  // Will be set in the backend
                newsId: '',   // Will be linked in the backend
                url,
                altText: imageFiles[index].altText || `Image ${index + 1}`,
                caption: imageFiles[index].caption || `Caption for image ${index + 1}`
            }));
        } catch (error) {
            console.error('Error uploading images:', error);
            return [];
        }
    };

    // ✅ Handle Article Submission
    const handleArticleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('jwt');

        try {
            const uploadedImages = await uploadImages();
            const newsPayload = { ...articleData, images: uploadedImages };

            await axios.post('http://localhost:8081/news', newsPayload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('Article created successfully!');
            setArticleData({
                title: '',
                content: '',
                author: '',
                date: '',
                category: '',
                template: 'Generic',
                images: [],
                comments: []
            });
            setImageFiles([]);

        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <div className="admin-page"> {/* ✅ Apply Flex Layout */}
            <MuiNavBar />
            <MuiCategoryBar />

            <div className="admin-container">
                <h2>Admin Dashboard</h2>

                {/* ✅ User Verification Section */}
                <div className="admin-section">
                    <h3>Unverified Users</h3>
                    {unverifiedUsers.length === 0 ? (
                        <p>No unverified users.</p>
                    ) : (
                        unverifiedUsers.map(user => (
                            <div key={user.userId} className="user-card">
                                <p>{user.firstName} {user.lastName} ({user.email})</p>
                                <button className="approve" onClick={() => verifyUser(user.userId)}>Verify</button>
                            </div>
                        ))
                    )}
                </div>

                {/* ✅ Article Creation Section */}
                <div className="admin-section">
                    <h3>Create Article</h3>
                    <form onSubmit={handleArticleSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={articleData.title}
                            onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Content"
                            value={articleData.content}
                            onChange={(e) => setArticleData({ ...articleData, content: e.target.value })}
                            required
                        ></textarea>
                        <input
                            type="text"
                            placeholder="Author"
                            value={articleData.author}
                            onChange={(e) => setArticleData({ ...articleData, author: e.target.value })}
                            required
                        />
                        <input
                            type="date"
                            value={articleData.date}
                            onChange={(e) => setArticleData({ ...articleData, date: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            value={articleData.category}
                            onChange={(e) => setArticleData({ ...articleData, category: e.target.value })}
                            required
                        />
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        {/* ✅ Image AltText & Caption Inputs */}
                        {imageFiles.map((img, index) => (
                            <div key={index} className="image-details">
                                <p>Image {index + 1}: {img.file.name}</p>
                                <input
                                    type="text"
                                    placeholder="Alt Text"
                                    value={img.altText}
                                    onChange={(e) => handleImageDetailsChange(index, 'altText', e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Caption"
                                    value={img.caption}
                                    onChange={(e) => handleImageDetailsChange(index, 'caption', e.target.value)}
                                    required
                                />
                            </div>
                        ))}

                        <button type="submit">Create Article</button>
                    </form>
                </div>
            </div>

            <MuiFooter />
        </div>
    );
};

export default Admin;
