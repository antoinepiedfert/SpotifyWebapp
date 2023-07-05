import React, { useState, useEffect, useRef } from "react";
import * as AiIcons from "react-icons/ai";
import './Track.css'
const Music = ({ url, imag }) => {

    const [Playing, setPlaying] = useState(true)

    const audioRef = useRef(null);

    const play = () => {
      if (Playing) {audioRef.current.play();}
      else {audioRef.current.pause();}
      setPlaying(!Playing)
    };
//

    return (
      <div className='child-icon'>
        <img className='image1' src={imag}/>
        {Playing ? <AiIcons.AiFillPlayCircle className="image2" onClick={() => play()} /> :  <AiIcons.AiFillPauseCircle className="image2" onClick={() => play()} />}
      
        <audio src={url} ref={audioRef}/>
      </div>
    );
  }
  

export default Music;