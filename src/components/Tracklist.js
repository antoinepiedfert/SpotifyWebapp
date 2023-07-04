import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Track from './Track'

function Tracklist( {tracks, token} ) {

    const [Previews, setPreviews] = useState({})
    const [Musicaldata, setMusicaldata] = useState({})
    const [DisplayPreviews, setDisplayPreviews] = useState(false)
    const [DisplayBPM, setDisplayBPM] = useState(false)

    function findElementbyId(elem, id) {
        if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
          if (elem[i].id === id) {
              return elem[i]
            }
          }
        }
      }

    useEffect(() => {
        if (tracks.length > 0){
          const Ids_extract = []
          for (let key in tracks) {
            Ids_extract.push(tracks[key].id)
          }
          BPM(Ids_extract)
          Preview(Ids_extract)
          }
      }, [tracks])

      useEffect(() => {
        if (Previews.length > 1){
          setDisplayPreviews(true)
        }
      },[Previews])
    
      useEffect(() => {
        if (Musicaldata.length > 1){
          setDisplayBPM(true)
        }
      },[Musicaldata])

      function Preview(ids) {
        setDisplayPreviews(false)
        const config = {
          headers:{'Authorization': `Bearer ${token}`}
        };
        const request = axios.get('https://api.spotify.com/v1/tracks?ids=' + ids.join('%2C') , config) 
    
       request
       .then(result => {
          setPreviews(result.data.tracks)
       })
       .catch(error => console.error('(1) Inside error:', error))
      }
    
      function BPM(ids) {
        setDisplayBPM(false)
        const config = {
          headers:{'Authorization': `Bearer ${token}`}
        };
        const request = axios.get("https://api.spotify.com/v1/audio-features?ids=" + ids.join('%2C'), config) 
    
       request
       .then(result => {
        setMusicaldata(result.data.audio_features)
       })
       .catch(error => console.error('(1) Inside error:', error))
      }

       
  if (DisplayPreviews && DisplayBPM) {
    return (
    <div>
    <ul >
        {tracks.map((track) => (
        <li className='tracklist-text'>
        <Track track={track} audiofeat={findElementbyId(Musicaldata, track.id)} trackdetails={findElementbyId(Previews, track.id)}/>
        </li>
        ))}
         
      </ul>
      </div>
    )
    }
  else {
    return (<></>)
  }
}

export default Tracklist