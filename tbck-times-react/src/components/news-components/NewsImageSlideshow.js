import React, { useState } from "react";


const NewsImageSlideshow = ({ images }) => {
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
        alt={`newspage-slideshow-image-${currentImageIndex}`}
        className="newspage-slideshow-image"
    />
    <button className="slideshow-button" onClick={nextImage}>&gt;</button>
    </div>
);
};

export default NewsImageSlideshow;