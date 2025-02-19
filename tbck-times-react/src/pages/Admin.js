import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Admin.css";
import { MuiNavBar } from "../components/MuiNavBar";
import { MuiCategoryBar } from "../components/MuiCategoryBar";
import { MuiFooter } from "../components/MuiFooter";

const Admin = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
    category: "",
    images: [],
    comments: [],
    template: "",
    externalLink: "",
  });

  const fetchUnverifiedUsers = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      const response = await axios.get("http://localhost:8080/user/unverified", {
        headers: { Authorization: `Bearer ${token}` },
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
      await axios.patch(`http://localhost:8080/user/verify/${userId}/USER`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnverifiedUsers(prev => prev.filter(user => user.userId !== userId));
      alert("User verified successfully!");
    } catch (error) {
      console.error("Error verifying user:", error);
      alert("Failed to verify user.");
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const token = sessionStorage.getItem("jwt");
      const response = await axios.post("http://localhost:8081/image/add/many", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      const uploadedImages = response.data.map((url, index) => ({
        url,
        altText: "",
        caption: "",
        imageId: "",
        newsId: "",
      }));
      setImages(uploadedImages);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...images];
    updatedImages[index][field] = value;
    setImages(updatedImages);
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("jwt");
    const articleData = {
      ...newArticle,
      images: images,
      comments: [],
    };

    try {
      await axios.post("http://localhost:8081/news", articleData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      alert("Article created successfully!");
      setNewArticle({ title: "", content: "", author: "", date: "", category: "", images: [], comments: [], template: "", externalLink: "" });
      setImages([]);
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to create article.");
    }
  };

  return (
    <div>
      <MuiNavBar />
      <MuiCategoryBar />
      <div className="admin-container">
        {/* Unverified Users */}
        <div className="verification-container">
          <h2 className="adminh2">Unverified Users</h2>
          {unverifiedUsers.length > 0 ? (
            unverifiedUsers.map((user) => (
              <div key={user.userId} className="user-card">
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button className="approve" onClick={() => verifyUser(user.userId)}>Verify</button>
              </div>
            ))
          ) : <p>No unverified users.</p>}
        </div>

        {/* Article Creation Form */}
        <div className="article-container">
          <h2>Create Article</h2>
          <form onSubmit={handleArticleSubmit}>
            <input type="text" className="admintext" placeholder="Title" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} required />
            <textarea placeholder="Content" className="admintext" value={newArticle.content} onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })} required />
            <input type="text" placeholder="Author" className="admintext" value={newArticle.author} onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })} required />
            <input type="date" value={newArticle.date} className="admintext" onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })} required />
            <input type="text" placeholder="Category" className="admintext" value={newArticle.category} onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })} required />
            <input type="text" placeholder="Template" className="admintext" value={newArticle.template} onChange={(e) => setNewArticle({ ...newArticle, template: e.target.value })} required />
            <input type="text" placeholder="External Link (Optional)" className="admintext" value={newArticle.externalLink} onChange={(e) => setNewArticle({ ...newArticle, externalLink: e.target.value })} />

            <input type="file" className="admintext" multiple onChange={handleImageUpload} />

            {images.map((img, index) => (
              <div key={index} className="image-inputs">
                <input type="text" placeholder="Alt Text" className="admintext" value={img.altText} onChange={(e) => handleImageChange(index, "altText", e.target.value)} required />
                <input type="text" placeholder="Caption" className="admintext" value={img.caption} onChange={(e) => handleImageChange(index, "caption", e.target.value)} required />
              </div>
            ))}

            <button type="submit" className="submit-article">Submit Article</button>
          </form>
        </div>
      </div>
      <MuiFooter />
    </div>
  );
};

export default Admin;
