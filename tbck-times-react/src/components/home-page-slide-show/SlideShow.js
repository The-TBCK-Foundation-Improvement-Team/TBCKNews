import React from 'react';
import { SlideShowCard } from './SlideShowCard';
import '../../css/home-page-slide-show/SlideShow.css';

export function SlideShow(props) {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const handleScrollLeft = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : props.news.length - 1));
    };

    const handleScrollRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex < props.news.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className="slide-show">
            <div className="slide-show-scroll-bar">
                <button 
                    className="slide-show-scroll-button" 
                    id="slide-show-scroll-left-button"
                    onClick={handleScrollLeft}
                >
                    {"<"}
                </button>
                <h1>Latest News</h1>
                <button 
                    className="slide-show-scroll-button" 
                    id="slide-show-scroll-right-button"
                    onClick={handleScrollRight}
                >
                    {">"}
                </button>
            </div>
            <div className="slide-show-cards" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {props.news.map((item, index) => (
                    <SlideShowCard
                        key={index}
                        title={item.title}
                        imgSrc={"https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"}
                        imgAlt={"text"}
                        author={item.author}
                        className={`slide-show-card ${index === currentIndex ? 'focused' : ''}`}
                    />
                ))}
                <SlideShowCard
                    key={-1}
                    title={props.news[props.news.length - 1].title}
                    imgSrc={"https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"}
                    imgAlt={"text"}
                    author={props.news[props.news.length - 1].author}
                    className="slide-show-card"
                />
                <SlideShowCard
                    key={props.news.length}
                    title={props.news[0].title}
                    imgSrc={"https://static.vecteezy.com/system/resources/thumbnails/001/950/054/small_2x/newspaper-mockup-template-free-vector.jpg"}
                    imgAlt={"text"}
                    author={props.news[0].author}
                    className="slide-show-card"
                />
            </div>
        </div>
    );
}