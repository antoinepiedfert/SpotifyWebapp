import React from 'react'
import { useEffect, useState } from 'react'
import '../App.css'
import '../components/Advanced.css'
import Slider from '../components/Slider'
import axios from 'axios';
import Tracklist from '../components/Tracklist'

function Advanced( {token, Playlists} ) {

    const ENDPOINT = 'https://api.spotify.com/v1'
    const [Happiness, setHappiness] = useState(0)
    const [Danceability, setDanceability] = useState(0)
    const [Acousticness, setAcousticness] = useState(0)
    const [Energy, setEnergy] = useState(0)
    const [Instrumentalness, setInstrumentalness] = useState(0)
    const [Liveness, setLiveness] = useState(0)
    const [Loudness, setLoudness] = useState(0)
    const [Artist, setArtist] = useState("")
    const [ArtistID, setArtistID] = useState("")
    const [Searchover, setSearchover] = useState(false)
    const [Tracks, setTracks] = useState(false)
    const [Url, setUrl] = useState("")
    const [CheckD, setCheckD] = useState(false)
    const [CheckA, setCheckA] = useState(false)
    const [CheckLi, setCheckLi] = useState(false)
    const [CheckLo, setCheckLo] = useState(false)
    const [CheckE, setCheckE] = useState(false)
    const [CheckI, setCheckI] = useState(false)
    const [CheckH, setCheckH] = useState(false)
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

    const handleChangeArtist = (event) => {
        const artist = event.target.value
        setArtist(artist)
      }

    function Search() {
        setArtistID('')
        setSearchover(false)
        setTracks(false)
        console.log('Artist:', Artist)
        const config = {
            headers:{'Authorization': `Bearer ${token}`}
          };
          const request = axios.get(ENDPOINT + '/search?q=artist%3A' + Artist + '&type=artist&limit=3', config) 
      
         request
         .then(result => {
            const myartist= result.data.artists.items[0]
            setArtistID(myartist.id)
            setSearchover(true)
         })
         .catch(error => {
            setArtistID('');
            setSearchover(true)
            }
            )
    }        
    
    function Extensivesearch() {
      console.log(ENDPOINT + '/recommendations?' + Url )
        const config = {
            headers:{'Authorization': `Bearer ${token}`}
          };
          const request = axios.get('https://api.spotify.com/v1/recommendations?' + Url
            , config) 
      
         request
         .then(result => {
            setTracks(result.data.tracks)
            setSearchover(false)
         })
         .catch(error => console.log(error))
    }   

    useEffect(() => {
        if (Searchover === true && Url != '') {
            Extensivesearch()
        }
    }, [Url, Searchover])

    useEffect(() => {
        let newUrl = []
        if (CheckD) {newUrl.push('target_danceability=' + Danceability/100.)}
        if (CheckA) {newUrl.push('target_acousticnessness=' + Acousticness/100.)}
        if (CheckLi) {newUrl.push('target_liveness=' + Liveness/100.)}
        if (CheckLo) {newUrl.push('target_loudness=' + Loudness/100.)}
        if (CheckI) {newUrl.push('target_instrumentalness=' + Instrumentalness/100.)}
        if (CheckE) {newUrl.push('target_energy=' + Energy/100.)}
        if (CheckH) {newUrl.push('target_valence=' + Happiness/100.)}
        if (Genres.length > 0) {newUrl.push('seed_genres=' + Genres.join('%2C'))}
        if (ArtistID != '') {newUrl.push('seed_artists=' + ArtistID)}
        const myUrl = newUrl.join('&')
        setUrl(myUrl)

    }, [CheckD, CheckE, CheckLi, CheckLo, CheckI, CheckA, Danceability, Acousticness, Liveness, Loudness, Instrumentalness, Energy, Genres, ArtistID])

    const handleChange = (event) => {
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
    <div className='App-header-flexh'>
      <div className='child-up'>
        <div className='child-sliders'>
        <Slider variable={Danceability} var_name='Danceability' handler={(event) => {setDanceability(event.target.value)}} clicker={() => setCheckD(!CheckD)} />
        <Slider variable={Acousticness} var_name='Acousticness' handler={(event) => {setAcousticness(event.target.value)}} clicker={() => setCheckA(!CheckA)}/>
        <Slider variable={Energy} var_name='Energy' handler={(event) => {setEnergy(event.target.value)}} clicker={() => setCheckE(!CheckE)}/>
        <Slider variable={Instrumentalness} var_name='Instrumentalness' handler={(event) => {setInstrumentalness(event.target.value)}} clicker={() => setCheckI(!CheckI)}/>
        <Slider variable={Liveness} var_name='Liveness' handler={(event) => {setLiveness(event.target.value)}} clicker={() => setCheckLi(!CheckLi)}/>
        <Slider variable={Happiness} var_name='Happiness' handler={(event) => {setHappiness(event.target.value)}} clicker={() => setCheckH(!CheckH)}/>

        

        <div className='lowerbox'>
        <form action='Search'>
        <input type='text' placeholder='Select an artist' onChange={handleChangeArtist}/>
        </form>
        
        <select onChange={(e) => handleChange(e)}>
        {available_genres.map(genre => <option value={genre}>{genre}</option>)}
        </select>
        <button className='button-34' onClick={Search}> Find Inspiration </button>

        </div>
        {Genres.map(genre => <div >  <button className='button-34' onClick={() => {removegenre(genre)}}> {genre} </button></div>)}
        </div>
      </div> 
      <div> 
        <div className='child-do'>
        {Tracks ? <Tracklist tracks={Tracks} token={token} Playlists={Playlists}/> : <></>}
        </div>
        </div>
    </div>
  )
}

export default Advanced