import React, { useState, useEffect, useRef } from "react";
import * as AiIcons from "react-icons/ai";
import './Track.css'
const Music = ({ url }) => {

    const [Playing, setPlaying] = useState(true)

    const audioRef = useRef(null);

    const play = (url) => {
      if (Playing) {audioRef.current.play();}
      else {audioRef.current.pause();}
      setPlaying(!Playing)
    };
  
    return (
      <>
        {Playing ? <AiIcons.AiFillPlayCircle className='child-icon' onClick={() => play()} /> :  <AiIcons.AiFillPauseCircle onClick={() => play()} />}
        <audio
          src={url}
          ref={audioRef}
        ></audio>
      </>
    );
  }
  

export default Music;