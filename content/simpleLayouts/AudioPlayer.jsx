

import React from 'react';

const AudioPlayer = () => (
  <audio controls>
    <source src="../posts/AA.mp3" type="audio/mp3" />
    Your browser does not support the audio element.
  </audio>
);

export default AudioPlayer;
