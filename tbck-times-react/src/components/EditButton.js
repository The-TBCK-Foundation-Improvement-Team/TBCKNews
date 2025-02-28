import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import PopUp from './PopUp.js';

const EditButton = ({ isAdmin, newsData }) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [editedNews, setEditedNews] = useState({ ...newsData });
  const [contentFieldsVisible, setContentFieldsVisible] = useState(1);
  const [images, setImages] = useState([]);
  const textAreaRefs = useRef([]);

  if (!isAdmin) return null; // Hide button for non-admins

  const handleArticleSubmit = (e) => {
  };

  const uploadImageToS3 = async (image) => {

    try {

      // Create a new form data object
      const formData = new FormData();

      // Append the image to the form data
      formData.append("file", image);

      // Send the image to the server
      const response = await fetch("http://localhost:8080/image/upload", {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` // Replace with your actual token if needed
        },
        method: "POST",
        body: formData,
      });

      // Get the image URL from the response
      const imageUrl = await response.text();

      return imageUrl;

    } catch (error) {
      console.error("Error uploading image to S3:", error);
    }

  };

  const deleteImageFromS3 = async (imageUrl) => {

    try {

      // Send a DELETE request to the server
      const response = await fetch(`http://localhost:8080/image/delete/${imageUrl}`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwt")}` // Replace with your actual token if needed
        },
        method: "DELETE",
      });


      if (response.ok) {
        console.log("Image deleted successfully!");
      }

    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageUpload = async (e) => {
    

  };

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

  const removeImage = (index) => {
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
          <form onSubmit={handleArticleSubmit}>
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
      </PopUp>
    </div>
  );
};

export default EditButton;
