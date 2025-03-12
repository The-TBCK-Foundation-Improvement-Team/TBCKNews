import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Admin.css";
import { MuiNavBar } from "../components/MuiNavBar";
import { MuiCategoryBar } from "../components/MuiCategoryBar";
import { MuiFooter } from "../components/MuiFooter";

const Admin = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [images, setImages] = useState([]);
  const [contentFieldsVisible, setContentFieldsVisible] = useState(1);

  const [newArticle, setNewArticle] = useState({
    title: "",
    author: "",
    date: "",
    contentOne: "",
    contentTwo: "",
    contentThree: "",
    category: "Category",
    images: [],
    comments: [],
    template: "Template",
    externalLink: "",
  });

  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  const fetchUnverifiedUsers = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      const response = await axios.get("https://tbckuserservice-env.eba-y8qwbxqf.us-east-2.elasticbeanstalk.com/user/unverified", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnverifiedUsers(response.data);
    } catch (error) {
      console.error("Error fetching unverified users:", error);
    }
  };

  const verifyUser = async (userId) => {
    try {
      const token = sessionStorage.getItem("jwt");
      await axios.patch(`https://tbckuserservice-env.eba-y8qwbxqf.us-east-2.elasticbeanstalk.com/user/verify/${userId}/GUEST`, {}, {
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
  
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }
  
    try {
      console.log("JWT Token:", token); // Debugging
  
      const response = await axios.post(
        "https://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/image/add/many",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Remove "Content-Type"; Axios will set it automatically
          },
        }
      );
  
      const uploadedImages = response.data.map((url, index) => ({
        url,
        fileName: files[index].name,
        altText: "",
        caption: "",
        imageId: "",
        newsId: "",
      }));
  
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Check the console for details.");
    }
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...images];
    updatedImages[index][field] = value;
    setImages(updatedImages);
  };

  const removeImage = async (index) => {
    const token = sessionStorage.getItem("jwt");
    const imageToDelete = images[index];
  
    if (!imageToDelete || !imageToDelete.url) {
      console.error("Invalid image object:", imageToDelete);
      return;
    }
  
    try {
      await axios.delete(`https://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/image/delete`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { key: imageToDelete.url }, // Pass the URL as a query parameter
      });
  
      const updatedImages = images.filter((_, i) => i !== index);
      setImages(updatedImages);
      alert("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image.");
    }
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
      await axios.post("https://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news", articleData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      alert("Article created successfully!");
      setNewArticle({
        template: "Template",
        title: "",
        author: "",
        date: "",
        contentOne: "",
        contentTwo: "",
        contentThree: "",
        category: "Category",
        images: [],
        comments: [],
        externalLink: "",
      });
      setImages([]);
    } catch (error) {
      console.error("Error creating article:", error);
      alert("Failed to create article.");
    }
  };

  return (
    <div className="admin-background">
      <MuiNavBar />
      <MuiCategoryBar />
      <div className="admin-container">
        <div className="verification-container">
          <h2 className="adminh2">Unverified Users</h2>
          {unverifiedUsers.length > 0 ? (
            unverifiedUsers.map((user) => (
              <div key={user.userId} className="user-card">
                <p className="admintext"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p className="admintext"><strong>Email:</strong> {user.email}</p>
                <button className="approve" onClick={() => verifyUser(user.userId)}>Verify</button>
              </div>
            ))
          ) : <p>No unverified users.</p>}
        </div>

        <div className="article-container">
          <h2 className="adminh2">Create Article</h2>
          <form onSubmit={handleArticleSubmit}>
            {/* Template Dropdown */}
            <select className="admin-dropdown" placeholder="Template" value={newArticle.template} onChange={(e) => setNewArticle({ ...newArticle, template: e.target.value })} required>
              <option value="Template">Template</option>
              <option value="News">News</option>
              <option value="Research">Research</option>
              <option value="Newsletter">Newsletter</option>
              <option value="Generic">Generic</option>
            </select>
            <input type="text" placeholder="Title" className="admintext" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} required />
            <input type="text" placeholder="Author" className="admintext" value={newArticle.author} onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })} required />
            <input type="date" placeholder="Date" value={newArticle.date} className="admintext" onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })} required />
            <textarea placeholder="Content One" className="admintext" value={newArticle.contentOne} onChange={(e) => setNewArticle({ ...newArticle, contentOne: e.target.value })} required />
            {contentFieldsVisible >= 2 && (<textarea placeholder="Content Two" className="admintext" value={newArticle.contentTwo} onChange={(e) => setNewArticle({ ...newArticle, contentTwo: e.target.value })} required />)}
            {contentFieldsVisible >= 3 && (<textarea placeholder="Content Three" className="admintext" value={newArticle.contentThree} onChange={(e) => setNewArticle({ ...newArticle, contentThree: e.target.value })} required />)}

            {/* Buttons to Add/Remove Content Fields */}
            <div className="content-buttons">
              {contentFieldsVisible < 3 && (
                <button type="button" className="ARTapprove" onClick={() => setContentFieldsVisible(contentFieldsVisible + 1)}>+ Add More Content</button>
              )}
              {contentFieldsVisible > 1 && (
                <button type="button" className="ARTremove" onClick={() => setContentFieldsVisible(contentFieldsVisible - 1)}>- Remove Content</button>
              )}
            </div>
            {/* Category Dropdown */}
            <select className="admin-dropdown" placeholder="Category" value={newArticle.category} onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })} required>
              <option value="Category">Category</option>
              <option value="News">News</option>
              <option value="Newsletter">Newsletter</option>
              <option value="Advocacy">Advocacy</option>
              <option value="Events">Events</option>
              <option value="WarriorOfTheMonth">Warrior Of The Month</option>
              <option value="Sports">Sports</option>
              <option value="Research">Research</option>
            </select>
            {newArticle.template === "Research" && (
              <input
                type="text"
                placeholder="External Link"
                className="admintext"
                value={newArticle.externalLink}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, externalLink: e.target.value })
                }
              />
            )}
            {newArticle.template === "Newsletter" && (
              <input
                type="text"
                placeholder="Newsletter PDF Link"
                className="admintext"
                value={newArticle.externalLink}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, externalLink: e.target.value })
                }
              />
            )}
            <div className="file-upload-container">
              <label htmlFor="file-upload" className="file-upload-label">
                Upload Images
              </label>
              <input
                id="file-upload"
                type="file"
                className="adminfile"
                multiple
                onChange={handleImageUpload}
              />
              {images.length > 0 && <span className="file-name-display">{images.length} file(s) selected</span>}
            </div>

            {images.map((img, index) => (
              <div key={index} className="image-inputs">
                <p className="image-filename"><strong>File:</strong> {img.fileName}</p> {/* Display file name */}
                <input
                  type="text"
                  placeholder="Alt Text"
                  className="admintext"
                  value={img.altText}
                  onChange={(e) => handleImageChange(index, "altText", e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Caption"
                  className="admintext"
                  value={img.caption}
                  onChange={(e) => handleImageChange(index, "caption", e.target.value)}
                  required
                />
                <button type="button" className="remove" onClick={() => removeImage(index)}>Remove</button>
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