import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Track from './Track'
import '../App.css'
import Select from 'react-select'
import { UserContext } from '../App'

function Tracklist( {tracks, Playlists} ) {

  const {token, logout} = useContext(UserContext);

  const [Previews, setPreviews] = useState({})
  const [Musicaldata, setMusicaldata] = useState({})
  const [DisplayPreviews, setDisplayPreviews] = useState(false)
  const [DisplayBPM, setDisplayBPM] = useState(false)
  const [DisplayLikes, setDisplayLikes] = useState(false)
  const [Likes, setLikes] = useState([])
  const [Ids, setIds] = useState([])
  const [Tracks, setTracks] = useState(tracks)
  const [Improvedtracks, setImprovedtracks] = useState(false)
  const [Offset, setOffset] = useState(10)

    function findMusicaldatabyId(id) { 
      if (Previews.length > 0) {
      for (let i = 0; i < Previews.length; i++) {
        if (Previews[i].id === id) {
            return Previews[i]}}}
    }
    
    function findPreviewsbyId(id) { 
      if (Musicaldata.length > 0) {
      for (let i = 0; i < Musicaldata.length; i++) {
        //console.log("Searching MD", Musicaldata[i].id, id)
        if (Musicaldata[i].id === id) {
            return Musicaldata[i]}}}
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
      if (Previews.length > 0){
        setDisplayPreviews(true)
      }
    },[Previews])
  
    useEffect(() => {
      if (Musicaldata.length > 0){
        setDisplayBPM(true)
      }
    },[Musicaldata])

    useEffect(() => {
      if (Likes.length > 0){
        setDisplayLikes(true)
      }
    },[Likes])

    useEffect(()=> {
      //console.log(DisplayBPM , DisplayLikes , DisplayPreviews , !Improvedtracks, DisplayBPM && DisplayLikes && DisplayPreviews && !Improvedtracks)
      if (DisplayBPM && DisplayLikes && DisplayPreviews && !Improvedtracks){
        for (let i=0 ; i<tracks.length ; i++){
          tracks[i]['audio_features'] = findPreviewsbyId(tracks[i].id)
          tracks[i]['track_details'] = findMusicaldatabyId(tracks[i].id)
          tracks[i]['liked'] = Likes[i]
        }
        setTracks(tracks)
        //console.log(tracks)
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
     .catch(error => {console.error('(1) Inside error:', error)
                      logout()})
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
     .catch(error => {console.error('(1) Inside error:', error)
                      logout()})
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
    .catch(error => {console.error('(1) Inside error:', error)
                      logout()})
    }

    const options = [{value:'BPM', label:'BPM'}, {value:'name', label:'name'},
                    {value:'artist', label:'artist'}, {value:'popularity', label:'popularity'},
                    {value:'release date', label:'release date'}, {value:'duration', label:'duration'},]

    function handleChange(event) {
      let sortedtracks = [...tracks]
      if (event.value === 'BPM') {
        sortedtracks = sortedtracks.sort(
          (t1, t2) => (t1.audio_features.tempo < t2.audio_features.tempo) ? 1 :
          (t1.audio_features.tempo > t2.audio_features.tempo) ? -1 : 0);
        } 
      else if  (event.value === 'name') {
        sortedtracks = sortedtracks.sort(
          (t1, t2) => (t1.name < t2.name) ? 1 :
          (t1.name > t2.name) ? -1 : 0);
        } 
      else if  (event.value === 'artist') {
        sortedtracks = sortedtracks.sort(
          (t1, t2) => (t1.artists[0].name < t2.artists[0].name) ? 1 :
          (t1.artists[0].name > t2.artists[0].name) ? -1 : 0);
        } 
        else if  (event.value === 'popularity') {
          sortedtracks = sortedtracks.sort(
            (t1, t2) => (t1.popularity < t2.popularity) ? 1 :
            (t1.popularity > t2.popularity) ? -1 : 0);
          } 
      setTracks(sortedtracks) 
    }

    const handleScroll = event => {
      //const top = event.target.scrollTop < 1;
      const bottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight < 1;
    if (bottom) { setOffset(Offset + 10) }
    //if (top) { if (Offset > 10) {setOffset(Offset - 10)} }
    };
   
  if (DisplayPreviews && DisplayBPM && DisplayLikes && Improvedtracks && Tracks.length > 0) {
    return (
    <div onScroll={handleScroll} style={{width:'1000px'}}>
        <Select placeholder='Filter by...' onChange={(e) => handleChange(e)} options={options} theme={(theme) => ({
                                                                                        ...theme,
                                                                                        borderRadius: 0,
                                                                                        colors: {
                                                                                          ...theme.colors,
                                                                                          primary25: '#5D5D81',
                                                                                          primary: '#5D5D81',
                                                                                          neutral0: '#3B3355',
                                                                                          neutral90: 'white',
                                                                                          neutral10: 'white',
                                                                                          neutral20: 'white',
                                                                                          neutral30: 'white',
                                                                                          neutral40: 'white',
                                                                                          neutral50: 'white',
                                                                                         neutral60: 'white',
                                                                                         neutral70: 'white',
                                                                                         neutral80: 'white',
                                                                                        },
                                                                                      })
                                                                            }
        />
    <ul style={{
          height: '900px',
          width: '1200px',
          overflow: 'scroll',
          overflowX: 'hidden'}}
          onScroll={handleScroll}>
        {Tracks.slice(0, Offset).map((track) => (
        <li  className='tracklist-text'>
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