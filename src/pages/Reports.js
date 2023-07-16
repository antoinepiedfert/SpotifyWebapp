import React from 'react'
import '../App.css'
import axios from 'axios';
import {useEffect, useState} from 'react';
import '../components/Tracklist.css'
import Tracklist from '../components/Tracklist'

function Reports({token, Playlists}) {

  const [Data, setData] = useState([])
  const [Keyword, setKeyword] = useState("")
  const [Year, setYear] = useState("")
  const [Artist, setArtist] = useState("")
  const [Url, setUrl] = useState("")
  const [Display, setDisplay] = useState(false)
  const [Genres, setGenres] = useState([])

  const available_genres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime",
  "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop",
  "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", 
  "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass",
  "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", 
  "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy",
  "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk",
  "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol",
  "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal",
  "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera",
  "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop",
  "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae",
  "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba",
  "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks",
  "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish",
  "work-out", "world-music"]
  function Search() {
    setDisplay(false)
    const config = {
      headers:{'Authorization': `Bearer ${token}`}
    };
    const request = axios.get('https://api.spotify.com/v1/search?q=' + Url + '&type=track&limit=3', config) 

   request
   .then(result => {setData(result.data.tracks.items)})
   .catch(error => console.error('(1) Inside error:', error))
  }

  const handleChangeK = (event) => {
    const keyword = event.target.value
    setKeyword(keyword)
  }

  const handleChangeY = (event) => {
    const year = event.target.value
    setYear(year)
  }

  const handleChangeA = (event) => {
    const artist = event.target.value
    setArtist(artist)
  }

  useEffect(() => {
    let url = Keyword 

    if (Year !== '') {url += '%20year:' + Year}
    if (Artist !== '') {url += '%20artist:' + Artist}

    setUrl(url)
  }, [Year, Artist, Keyword])

  useEffect(() => {
    if (Data.length > 0){
      setDisplay(true)
    }
  }, [Data])

  const handleChangeG = (event) => {
    let genres_copy = [...Genres]
    if (genres_copy.length < 5) {
      genres_copy.push(event.target.value)
      setGenres(genres_copy)
    }
  };

  const removegenre = (genre) => {
    let genres_copy = [...Genres]
    const index = genres_copy.indexOf(genre);
    if (index > -1) { 
      genres_copy.splice(index, 1); 
    }
    setGenres(genres_copy)
  };

    return (
    <div className='App-header'>
      <form >
        <input type='text' placeholder='Keywords (optional)' onChange={handleChangeK}/>
        <input type='text' placeholder='Year: "2014" or "1981-1989"' onChange={handleChangeY}/>
        <input type='text' placeholder='Artist' onChange={handleChangeA}/>
        <select onChange={(e) => handleChangeG(e)}>
        {available_genres.map(genre => <option value={genre}>{genre}</option>)}
        </select>
        <button className='button-34' onClick={Search}> Find Inspiration </button>
      
        {Genres.map(genre => <div >  <button className='button-34' onClick={() => {removegenre(genre)}}> {genre} </button></div>)}
        
      </form>
      <button onClick={Search}> SEARCH </button>
      {Display ? <Tracklist tracks={Data} token={token} Playlists={Playlists}/> : <></>}
    </div>)


}

export default Reports