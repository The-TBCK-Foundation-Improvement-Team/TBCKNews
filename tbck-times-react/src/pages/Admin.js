"use client";
import { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [articles, setArticles] = useState([
    { title: "", text: "", images: [], videos: [] },
  ]);
  const [youtubeURLs, setYoutubeURLs] = useState([""]);

  const handleTitleChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].title = value;
    setArticles(newArticles);
  };

  const handleTextChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].text = value;
    setArticles(newArticles);
  };

  const handleImageChange = (articleIndex, imageIndex, field, value) => {
    const updatedArticles = [...articles];
    updatedArticles[articleIndex].images[imageIndex][field] = value;
    setArticles(updatedArticles);
  };

  const handleVideoChange = (articleIndex, index, field, value) => {
    const updatedArticles = [...articles];
    updatedArticles[articleIndex].videos[index][field] = value;
    setArticles(updatedArticles);
  };

  const removeImage = (articleIndex, imageIndex) => {
    const updatedArticles = [...articles];
    updatedArticles[articleIndex].images.splice(imageIndex, 1);
    setArticles(updatedArticles);
  };

  const removeVideo = (articleIndex, index) => {
    const updatedArticles = [...articles];
    updatedArticles[articleIndex].videos.splice(index, 1);
    setArticles(updatedArticles);
  };

  const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const addYoutubeLink = (articleIndex) => {
    const url = youtubeURLs[articleIndex];
    const videoId = extractYouTubeId(url);
    if (videoId) {
      const newVideo = {
        url,
        fileName: `YouTube - ${videoId}`,
        caption: "",
        type: "youtube",
      };
      setArticles((prev) => {
        const updated = [...prev];
        updated[articleIndex].videos.push(newVideo);
        return updated;
      });
      setYoutubeURLs((prev) => {
        const copy = [...prev];
        copy[articleIndex] = "";
        return copy;
      });
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const handleVideoUpload = (e, articleIndex) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      file,
      fileName: file.name,
      preview: URL.createObjectURL(file),
      caption: "",
      type: "mp4",
    }));
    setArticles((prev) => {
      const updated = [...prev];
      updated[articleIndex].videos.push(...newVideos);
      return updated;
    });
  };

  const handleImageUpload = (e, articleIndex) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: "",
    }));
    const updatedArticles = [...articles];
    updatedArticles[articleIndex].images.push(...newImages);
    setArticles(updatedArticles);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      articles.forEach((article, articleIndex) => {
        formData.append(`articles[${articleIndex}][title]`, article.title);
        formData.append(`articles[${articleIndex}][text]`, article.text);

        article.images.forEach((image, imageIndex) => {
          if (image.file) {
            formData.append(`articles[${articleIndex}][images][${imageIndex}]`, image.file);
          }
          formData.append(
            `articles[${articleIndex}][captions][${imageIndex}]`,
            image.caption || ""
          );
        });

        article.videos.forEach((video, videoIndex) => {
          if (video.type === "mp4" && video.file) {
            formData.append(`articles[${articleIndex}][videos][${videoIndex}]`, video.file);
          } else {
            formData.append(`articles[${articleIndex}][videos][${videoIndex}]`, video.url);
          }
          formData.append(
            `articles[${articleIndex}][videoCaptions][${videoIndex}]`,
            video.caption || ""
          );
        });
      });

      const response = await axios.post("/api/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload successful:", response.data);
      alert("Articles uploaded!");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside the 2xx range
        console.error("Server responded with error:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message);
      }
      alert("Upload failed.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {articles.map((article, index) => (
        <div key={index} className="mb-8 border p-4 rounded shadow">
          <input
            type="text"
            placeholder="Article Title"
            className="border p-2 w-full mb-2"
            value={article.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
          />
          <textarea
            placeholder="Article Text"
            className="border p-2 w-full mb-4"
            rows="5"
            value={article.text}
            onChange={(e) => handleTextChange(index, e.target.value)}
          />

          <div className="mb-4">
            <label className="block font-semibold mb-1">Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e, index)}
              className="mb-2"
            />
            {article.images.map((img, imgIndex) => (
              <div key={imgIndex} className="mb-2">
                <img src={img.preview} alt={`Preview ${imgIndex}`} className="w-32 h-32 object-cover" />
                <input
                  type="text"
                  placeholder="Caption"
                  value={img.caption}
                  onChange={(e) => handleImageChange(index, imgIndex, "caption", e.target.value)}
                  className="border p-1 w-full"
                />
                <button
                  onClick={() => removeImage(index, imgIndex)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload MP4 Videos:</label>
            <input
              type="file"
              accept="video/mp4"
              multiple
              onChange={(e) => handleVideoUpload(e, index)}
            />
            <div className="mt-2">
              {article.videos.map((vid, vidIndex) => (
                <div key={vidIndex} className="mb-2">
                  {vid.type === "youtube" ? (
                    <iframe
                      width="320"
                      height="180"
                      src={`https://www.youtube.com/embed/${extractYouTubeId(vid.url)}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video width="320" height="180" controls src={vid.preview || ""}></video>
                  )}
                  <input
                    type="text"
                    placeholder="Video Caption"
                    value={vid.caption}
                    onChange={(e) => handleVideoChange(index, vidIndex, "caption", e.target.value)}
                    className="border p-1 w-full"
                  />
                  <button
                    onClick={() => removeVideo(index, vidIndex)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Add YouTube Video:</label>
            <input
              type="text"
              placeholder="YouTube URL"
              value={youtubeURLs[index] || ""}
              onChange={(e) => {
                const updated = [...youtubeURLs];
                updated[index] = e.target.value;
                setYoutubeURLs(updated);
              }}
              className="border p-1 w-full mb-2"
            />
            <button
              onClick={() => addYoutubeLink(index)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Add YouTube Video
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          setArticles([...articles, { title: "", text: "", images: [], videos: [] }]);
          setYoutubeURLs([...youtubeURLs, ""]);
        }}
        className="bg-gray-700 text-white px-4 py-2 rounded mb-4"
      >
        Add New Article
      </button>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded font-semibold"
      >
        Submit Articles
      </button>
    </div>
  );
}
