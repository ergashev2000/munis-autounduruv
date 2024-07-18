import React, { useState, useRef, useEffect } from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AudioPlayerCustom: React.FC = () => {
  return (
    <AudioPlayer
      src="https://d38nvwmjovqyq6.cloudfront.net/va90web25003/companions/Foundations%20of%20Rock/13.01.mp3"
      onPlay={e => console.log("onPlay")}
    />
  );
};

export default AudioPlayerCustom;
