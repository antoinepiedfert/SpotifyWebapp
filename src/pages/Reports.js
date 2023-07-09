import React from 'react'
import '../App.css'
import axios from 'axios';
import {useEffect, useState} from 'react';
import '../components/Tracklist.css'
import Tracklist from '../components/Tracklist'

function Reports({token, Playlists}) {

  const [Data, setData] = useState([])
  const [Artist, setArtist] = useState("")
 
  function Search() {
    const config = {
      headers:{'Authorization': `Bearer ${token}`}
    };
    const request = axios.get('https://api.spotify.com/v1/search?q=artist%3A' + Artist + '&type=track&limit=3', config) 

   request
   .then(result => {setData(result.data.tracks.items)})
   .catch(error => console.error('(1) Inside error:', error))
  }

  const handleChange = (event) => {
    const artist = event.target.value
    setArtist(artist)
  }

    return (
    <div className='App-header'>
      <form action='Search'>
        <input type='text' placeholder='Select an artist' onChange={handleChange}/>
      </form>
      <button onClick={Search}> SEARCH </button>
      {Data ? <Tracklist tracks={Data} token={token} Playlists={Playlists}/> : <></>}
    </div>)


}

export default Reports