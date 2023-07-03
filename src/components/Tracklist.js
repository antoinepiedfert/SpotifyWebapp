import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Track from './Track'

function Tracklist( {tracks, token} ) {

    const [Imported, setImported] = useState(false)
    const [Previews, setPreviews] = useState({})
    const [Musicaldata, setMusicaldata] = useState({})
    const [Ids, setIds] = useState([])
    const [DisplayPreviews, setDisplayPreviews] = useState(false)
    const [DisplayBPM, setDisplayBPM] = useState(false)

    function findElementbyId(elem, id, key) {
        //console.log('Dans finder', elem)
        //console.log(id)
        console.log('dans finder', elem.length, elem)
        if (elem.length > 0) {
        for (let i = 0; i < elem.length; i++) {
          if (elem[i].id === id) {
            if (key==='tempo' && elem[i][key]>140){
              return elem[i][key]/2
            }
            else {
              return elem[i][key]
            }
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
          setIds(Ids_extract)
    
          setImported(true)
          }
      }, [tracks])

      useEffect(() => {
        if (tracks.length > 0){
            BPM()
            Preview()
        }
      }, [Imported])

      useEffect(() => {
        if (Previews){
          setDisplayPreviews(true)
        }
      },[Previews])
    
      useEffect(() => {
        if (Musicaldata){
          setDisplayBPM(true)
        }
      },[Musicaldata])

      function Preview() {
        setDisplayPreviews(false)
        const config = {
          headers:{'Authorization': `Bearer ${token}`}
        };
        const request = axios.get('https://api.spotify.com/v1/tracks?ids=' + Ids.join('%2C') , config) 
    
       request
       .then(result => {
          setPreviews(result.data.tracks)
       })
       .catch(error => console.error('(1) Inside error:', error))
      }
    
      function BPM() {
        setDisplayBPM(false)
        const config = {
          headers:{'Authorization': `Bearer ${token}`}
        };
        const request = axios.get("https://api.spotify.com/v1/audio-features?ids=" + Ids.join('%2C'), config) 
    
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
        {DisplayBPM}  <Track track={track} finder={findElementbyId} audiofeat={Musicaldata} trackdetails={Previews}/>
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