import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import PopUp from './PopUp.js';

const EditButton = ({ isAdmin, newsData }) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [editedNews, setEditedNews] = useState({ ...newsData });
  const [contentFieldsVisible, setContentFieldsVisible] = useState(1);
  const [images, setImages] = useState([]);
  const textAreaRefs = useRef([]);

  if (!isAdmin) return null; // Hide button for non-admins

  const handleArticleSubmit = async (e, newsId) => {
    e.preventDefault();

    console.log("Submitting edited news article:", JSON.stringify(editedNews));

  try {
    const token = sessionStorage.getItem("jwt");

    const response = await axios.patch(
      `https://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/${newsId}`, // Adjust the endpoint if necessary
      editedNews,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Updated news article:", JSON.stringify(response.data));
    
    // Optionally, reset the form or navigate away
    setEditedNews({ title: "", content: "", images: [] });
    setImages([]);

  } catch (error) {
    console.error("Error updating news:", error);
    alert("Failed to update the news article.");
  }
  };

  const deleteArticle = async (newsId) => {

    try {
      const token = sessionStorage.getItem("jwt");

      const response = await axios.delete(
        `https://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/news/${newsId}`, // Adjust the endpoint if necessary
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Deleted news article:", JSON.stringify(response.data));
      
      // Optionally, reset the form or navigate away
      setEditedNews({ title: "", content: "", images: [] });
      setImages([]);
      setButtonPopup(false);

    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete the news article.");
    }

  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file) => formData.append("images", file));

    try {
      const token = sessionStorage.getItem("jwt");
      const response = await axios.post("https://newsserviceapi-env.eba-kaahc5te.us-east-2.elasticbeanstalk.com/image/add/many", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      const uploadedImages = response.data.map((url, index) => ({
        url,
        altText: "",
        caption: "",
        imageId: "",
        newsId: "",
      }));

      setImages((prevImages) => [...prevImages, ...uploadedImages]);
      // Update the editedNews object with new images
      setEditedNews((prevNews) => ({
        ...prevNews,
        images: [...(prevNews.images || []), ...uploadedImages],
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
      console.Log("Failed to upload images.");
    }

  };

  //changes the test for the images
  const handleImageChange = (index, key, value) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = { ...updatedImages[index], [key]: value };
      return updatedImages;
    });

    // Update the news data to reflect the change
    setEditedNews((prevNews) => ({
      ...prevNews,
      images: prevNews.images.map((img, i) =>
        i === index ? { ...img, [key]: value } : img
      ),
    }));
  };

  const removeImage = async(index) => {

    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);

      // Update the news data to reflect the change
      setEditedNews((prevNews) => ({
        ...prevNews,
        images: updatedImages,
      }));

      return updatedImages;
    });
    console.log("updated images: " + JSON.stringify(images));
  };

  //when a content section is removed it sets its content to ""
  const handleRemoveContentField = () => {
    setEditedNews((prev) => {
      const updatedNews = { ...prev };
      if (contentFieldsVisible === 3) delete updatedNews.contentThree;
      if (contentFieldsVisible === 2) delete updatedNews.contentTwo;
      return updatedNews;
    });

    setContentFieldsVisible((prev) => prev - 1);

    console.log("updated edited news" + JSON.stringify(editedNews));
  };

  const handleOpenPopup = () => {
    setEditedNews({ ...newsData });
    setImages(newsData.images || []);

    // Determine how many content fields are filled
    let visibleFields = 1;
    if (newsData.contentTwo) visibleFields = 2;
    if (newsData.contentThree) visibleFields = 3;

    setContentFieldsVisible(visibleFields);
    setButtonPopup(true);

    // Wait for the popup to open, then resize textareas
    setTimeout(() => {
      textAreaRefs.current.forEach((textArea) => {
        if (textArea) {
          textArea.style.height = "auto"; // Reset height
          textArea.style.height = `${textArea.scrollHeight}px`; // Adjust to content
        }
      });
    }, 0); // Ensures it runs after the state updates
  };

  return (
    <div>
      <button className="edit-button" onClick={() => handleOpenPopup()} >Edit</button>
      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="article-container">
          <h2 className="adminh2">Create Article</h2>
          <form onSubmit={(e) => handleArticleSubmit(e, newsData.newsId)}>
            {/* Template Dropdown */}
            <select className="admin-dropdown" placeholder="Template" value={editedNews.template} onChange={(e) => setEditedNews({ ...editedNews, template: e.target.value })} required>
              <option value="Template">Template</option>
              <option value="News">News</option>
              <option value="Research">Research</option>
              <option value="Newsletter">Newsletter</option>
              <option value="Generic">Generic</option>
            </select>
            <input type="text" placeholder="Title" className="admintext" value={editedNews.title} onChange={(e) => setEditedNews({ ...editedNews, title: e.target.value })} required />
            <input type="text" placeholder="Author" className="admintext" value={editedNews.author} onChange={(e) => setEditedNews({ ...editedNews, author: e.target.value })} required />
            <input type="date" placeholder="Date" value={editedNews.date} className="admintext" onChange={(e) => setEditedNews({ ...editedNews, date: e.target.value })} required />
            <textarea ref={(el) => (textAreaRefs.current[0] = el)} placeholder="Content One" className="admintext" value={editedNews.contentOne} onChange={(e) => setEditedNews({ ...editedNews, contentOne: e.target.value })}
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset height
                e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
              }} required />
            {contentFieldsVisible >= 2 && (<textarea ref={(el) => (textAreaRefs.current[1] = el)} placeholder="Content Two" className="admintext" value={editedNews.contentTwo} onChange={(e) => setEditedNews({ ...editedNews, contentTwo: e.target.value })}
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset height
                e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
              }} required />)}
            {contentFieldsVisible >= 3 && (<textarea ref={(el) => (textAreaRefs.current[2] = el)} placeholder="Content Three" className="admintext" value={editedNews.contentThree} onChange={(e) => setEditedNews({ ...editedNews, contentThree: e.target.value })}
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset height
                e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
              }} required />)}

            {/* Buttons to Add/Remove Content Fields */}
            <div className="content-buttons">
              {contentFieldsVisible < 3 && (
                <button type="button" className="ARTapprove" onClick={() => setContentFieldsVisible(contentFieldsVisible + 1)}>+ Add More Content</button>
              )}
              {contentFieldsVisible > 1 && (
                <button type="button" className="ARTremove" onClick={() => handleRemoveContentField()}>- Remove Content</button>
              )}
            </div>
            {/* Category Dropdown */}
            <select className="admin-dropdown" placeholder="Category" value={editedNews.category} onChange={(e) => setEditedNews({ ...editedNews, category: e.target.value })} required>
              <option value="Category">Category</option>
              <option value="News">News</option>
              <option value="Newsletter">Newsletter</option>
              <option value="Advocacy">Advocacy</option>
              <option value="Events">Events</option>
              <option value="WarriorOfTheMonth">Warrior Of The Month</option>
              <option value="Sports">Sports</option>
              <option value="Research">Research</option>
            </select>
            {editedNews.template === "Research" && (
              <input
                type="text"
                placeholder="External Link"
                className="admintext"
                value={editedNews.externalLink}
                onChange={(e) =>
                  setEditedNews({ ...editedNews, externalLink: e.target.value })
                }
              />
            )}
            {editedNews.template === "Newsletter" && (
              <input
                type="text"
                placeholder="External PDF Link"
                className="admintext"
                value={editedNews.externalLink}
                onChange={(e) =>
                  setEditedNews({ ...editedNews, externalLink: e.target.value })
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
                <p className="image-filename"><strong>File:</strong> {img.url.split('/').pop()}</p> {/* Display file name */}
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit" className="submit-article">Submit Article</button>
              <button type="button" className="submit-article" onClick={() => { if(window.confirm("are you sure you want to delete this article?")){deleteArticle(newsData.newsId)} }}>Delete Article</button>
            </div>
            
          </form>
        </div>
      </PopUp>
    </div>
  );
};

export default EditButton;
