import React, { useState } from "react";

const EditButton = ({ isAdmin, newsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedNews, setEditedNews] = useState({ ...newsData });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAdmin) return null; // Hide button for non-admins

  const handleChange = (e) => {
    setEditedNews({ ...editedNews, [e.target.name]: e.target.value });
  };

  // Update news post
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:8081/news/${newsData.newsId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedNews),
      });

      if (!response.ok) throw new Error("Failed to update news post");

      alert("News updated successfully!");
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete news post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this news post?")) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:8081/news/${newsData.newsId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete news post");

      alert("News deleted successfully!");
      setIsOpen(false);
      window.location.reload(); // Refresh page after delete
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      empty
    </div>
  );
};

export default EditButton;
