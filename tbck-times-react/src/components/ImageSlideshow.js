import React, { useState } from "react";
import "../css/ImageSlideshow.css";

const ImageSlideshow = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    };
  
    return (
      <div className="slideshow">
        <button className="slideshow-button" onClick={prevImage}>&lt;</button>
        <img
          src={images[currentImageIndex].url}
          alt={`slideshow-image-${currentImageIndex}`}
          className="slideshow-image"
        />
        <button className="slideshow-button" onClick={nextImage}>&gt;</button>
      </div>
    );
  };

export default ImageSlideshow;