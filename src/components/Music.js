import React, { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Music = ({ url }) => {
  
  const [playing, toggle] = useAudio(url);

  return (
    <div>
      {!playing ? <AiIcons.AiFillPlayCircle onClick={toggle}/> : <AiIcons.AiFillPauseCircle onClick={toggle}/>}
    </div>
  );
};

export default Music;