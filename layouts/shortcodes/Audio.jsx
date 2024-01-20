
import React, { useState, useRef, useEffect } from 'react';

const Audio = ({ src, type = 'audio/mp3', ...rest }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  return (
    <div className="audio-container p-4 rounded">
      {!isPlaying && (
        <button
          onClick={handlePlay}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play
        </button>
      )}
      {isPlaying && (
        <audio
          ref={audioRef}
          className="overflow-hidden rounded mt-2"
          controls
          {...rest}
          onEnded={() => setIsPlaying(false)} // Pause when audio finishes playing
        >
          <source src={src.match(/^http/) ? src : `${src}`} type={type} />
        </audio>
      )}
    </div>
  );
};

export default Audio;
