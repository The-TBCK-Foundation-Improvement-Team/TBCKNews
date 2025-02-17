import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Admin.css';
import { MuiNavBar } from '../components/MuiNavBar';
import { MuiCategoryBar } from '../components/MuiCategoryBar';
import { MuiFooter } from '../components/MuiFooter';

const Admin = () => {
    const [unverifiedUsers, setUnverifiedUsers] = useState([]);
    const [images, setImages] = useState([]);
    const [article, setArticle] = useState({
        title: '',
        content: '',
        author: '',
        date: '',
        category: '',
        images: [],
        template: 'Generic'
    });

    useEffect(() => {
        const fetchUnverifiedUsers = async () => {
            try {
                const token = sessionStorage.getItem("jwt");
                const response = await axios.get("http://localhost:8080/user/unverified", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUnverifiedUsers(response.data);
            } catch (error) {
                console.error("Error fetching unverified users:", error);
            }
        };
        fetchUnverifiedUsers();
    }, []);

    const verifyUser = async (userId) => {
        try {
            const token = sessionStorage.getItem("jwt");
            await axios.patch(`http://localhost:8080/user/verify/${userId}/USER`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUnverifiedUsers(prev => prev.filter(user => user.userId !== userId));
            alert("User verified successfully!");
        } catch (error) {
            console.error("Error verifying user:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({ file, caption: '', altText: '' }));
        setImages([...images, ...newImages]);
    };

    const handleImageMetaChange = (index, field, value) => {
        const updatedImages = images.map((img, i) => i === index ? { ...img, [field]: value } : img);
        setImages(updatedImages);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleSubmit = async () => {
        const token = sessionStorage.getItem("jwt");
        try {
            const formData = new FormData();
            images.forEach((img, index) => formData.append(`images`, img.file));
            const uploadResponse = await axios.post('http://localhost:8081/image/add/many', formData, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
            });

            const uploadedImages = uploadResponse.data.map((url, index) => ({
                url,
                altText: images[index].altText,
                caption: images[index].caption
            }));

            const newArticle = { ...article, images: uploadedImages };
            await axios.post('http://localhost:8081/news', newArticle, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Article created successfully!');
            setArticle({ title: '', content: '', author: '', date: '', category: '', images: [], template: 'Generic' });
            setImages([]);
        } catch (error) {
            console.error('Error creating article:', error);
            alert('Failed to create article.');
        }
    };

    return (
        <div>
            <MuiNavBar />
            <MuiCategoryBar />
            <div className="admin-container">
                <div className="verification-container">
                    <h2>Unverified Users</h2>
                    {unverifiedUsers.map(user => (
                        <div key={user.userId} className="user-card">
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button onClick={() => verifyUser(user.userId)}>Verify</button>
                        </div>
                    ))}
                </div>
                <div className="article-container">
                    <h2>Create Article</h2>
                    <input name="title" value={article.title} onChange={handleInputChange} placeholder="Title" />
                    <textarea name="content" value={article.content} onChange={handleInputChange} placeholder="Content" />
                    <input name="author" value={article.author} onChange={handleInputChange} placeholder="Author" />
                    <input type="date" name="date" value={article.date} onChange={handleInputChange} />
                    <input name="category" value={article.category} onChange={handleInputChange} placeholder="Category" />
                    <input type="file" multiple onChange={handleImageChange} />
                    {images.map((img, index) => (
                        <div key={index} className="image-inputs">
                            <p>{img.file.name}</p>
                            <input placeholder="Alt Text" value={img.altText} onChange={(e) => handleImageMetaChange(index, 'altText', e.target.value)} />
                            <input placeholder="Caption" value={img.caption} onChange={(e) => handleImageMetaChange(index, 'caption', e.target.value)} />
                            <button onClick={() => handleRemoveImage(index)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Create Article</button>
                </div>
            </div>
            <MuiFooter />
        </div>
    );
};

export default Admin;
