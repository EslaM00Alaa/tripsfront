import React from "react";

const VideoPlayer = ({ videoId }) => {
  if (!videoId) {
    return null; // If videoId is undefined, return null to render nothing
  }

  return <video controls src={videoId}></video>; // Render video element if videoId is defined
};

export default VideoPlayer;
