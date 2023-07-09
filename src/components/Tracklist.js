import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Track from './Track'

function Tracklist( {tracks, token, Playlists} ) {

  const [Previews, setPreviews] = useState({})
  const [Musicaldata, setMusicaldata] = useState({})
  const [DisplayPreviews, setDisplayPreviews] = useState(false)
  const [DisplayBPM, setDisplayBPM] = useState(false)
  const [DisplayLikes, setDisplayLikes] = useState(false)
  const [Likes, setLikes] = useState([])
  const [Ids, setIds] = useState([])
  const [Tracks, setTracks] = useState(tracks)
  const [Improvedtracks, setImprovedtracks] = useState(false)


  

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
        setIds(Ids_extract)
        BPM(Ids_extract, 0, [])
        Preview(Ids_extract, 0, [])
        Like(Ids_extract, 0, [])
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

    useEffect(() => {
      if (Likes.length > 1){
        setDisplayLikes(true)
      }
    },[Likes])

    useEffect(()=> {
      if (DisplayBPM && DisplayLikes && DisplayPreviews && !Improvedtracks){
        for (let i=0 ; i<tracks.length ; i++){
          tracks[i]['audio_features'] = findElementbyId(Musicaldata, tracks[i].id)
          tracks[i]['track_details'] = findElementbyId(Previews, tracks[i].id)
          tracks[i]['liked'] = Likes[i]
        }
        setTracks(tracks)
        setImprovedtracks(true)
      }
    },[DisplayBPM, DisplayLikes, DisplayPreviews])

    function Preview(ids, offset, previews) {
      setDisplayPreviews(false)
      const config = {
        headers:{'Authorization': `Bearer ${token}`}
      };
      const request = axios.get('https://api.spotify.com/v1/tracks?ids=' + ids.slice(offset, offset + 50).join('%2C') + '&offset=' + offset, config) 
  
     request
     .then(response => {{
              
      let new_preview = previews.concat(response.data.tracks);

      const nextoffset = offset + 50

      if (response.data.tracks.length === 50){
        Preview(ids, nextoffset, new_preview)
      } else {
          setPreviews(new_preview)        }
  }
     })
     .catch(error => console.error('(1) Inside error:', error))
    }

    function BPM(ids, offset, previews) {
      setDisplayBPM(false)
      const config = {
        headers:{'Authorization': `Bearer ${token}`}
      };
      const request = axios.get('https://api.spotify.com/v1/audio-features?ids=' + ids.slice(offset, offset + 50).join('%2C') + '&offset=' + offset, config) 
  
     request
     .then(response => {{
              
      let new_preview = previews.concat(response.data.audio_features);

      if (response.data.audio_features.length === 50){
        BPM(ids, offset + 50, new_preview)
      } else {
        setMusicaldata(new_preview)
      }
  }
     })
     .catch(error => console.error('(1) Inside error:', error))
    }

    function Like(ids, offset, previews) {
    setDisplayLikes(false)
    const config = {
      headers:{'Authorization': `Bearer ${token}`}
    };
    const request = axios.get('https://api.spotify.com/v1/me/tracks/contains?ids=' + ids.slice(offset, offset + 50).join('%2C'), config) 

    request
    .then(response => {{
            
      let new_preview = previews.concat(response.data);

      const nextoffset = offset + 50

      if (response.data.length === 50){
        Like(ids, nextoffset, new_preview)
      } else {
        setLikes(new_preview)
        setDisplayLikes(true)
        }
    }
    })
    .catch(error => console.error('(1) Inside error:', error))
    }

    const filters = ['filter by...', 'BPM', 'name', 'artist']
    function handleChange(event) {
      let sortedtracks = [...tracks]
      if (event.target.value === 'BPM') {
        sortedtracks = sortedtracks.sort(
          (t1, t2) => (t1.audio_features.tempo < t2.audio_features.tempo) ? 1 :
          (t1.audio_features.tempo > t2.audio_features.tempo) ? -1 : 0);
        } 
      else if  (event.target.value === 'name') {
        sortedtracks = sortedtracks.sort(
          (t1, t2) => (t1.name < t2.name) ? 1 :
          (t1.name > t2.name) ? -1 : 0);
        } 
      else if  (event.target.value === 'artist') {
        sortedtracks = sortedtracks.sort(
          (t1, t2) => (t1.artists[0].name < t2.artists[0].name) ? 1 :
          (t1.artists[0].name > t2.artists[0].name) ? -1 : 0);
        } 
      setTracks(sortedtracks) 
      console.log(sortedtracks)
    }

  if (DisplayPreviews && DisplayBPM && DisplayLikes && Improvedtracks) {
    return (
    <div>
      <select className='select-box' onChange={(e) => handleChange(e)}>
        {filters.map(filter => <option value={filter}>{filter}</option>)}
      </select>
    <ul >
        {Tracks.map((track) => (
        <li className='tracklist-text'>
        <Track token={token} track={track} Playlists={Playlists} />
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