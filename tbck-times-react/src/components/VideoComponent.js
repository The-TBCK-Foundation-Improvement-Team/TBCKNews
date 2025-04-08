const VideoComponent = () => {
    return (
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src="/videos/your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoComponent;
  