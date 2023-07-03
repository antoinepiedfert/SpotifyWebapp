import React from 'react'
import { useEffect, useState } from 'react'
import '../App.css'
import '../components/Advanced.css'
import Slider from '../components/Slider'
import axios from 'axios';
import Tracklist from '../components/Tracklist'

function Advanced( {token} ) {

    const ENDPOINT = 'https://api.spotify.com/v1'

    const [Dancebility, setDanceability] = useState(0)
    const [Acoustic, setAcoustic] = useState(0)
    const [Energy, setEnergy] = useState(0)
    const [Instrumentalness, setInstrumentalness] = useState(0)
    const [Liveness, setLiveness] = useState(0)
    const [Loudness, setLoudness] = useState(0)
    const [Artist, setArtist] = useState("")
    const [ArtistID, setArtistID] = useState("")
    const [Searchover, setSearchover] = useState(false)
    const [Tracks, setTracks] = useState(false)

    const handleChangeArtist = (event) => {
        const artist = event.target.value
        setArtist(artist)
      }

    function Search() {
        setSearchover(false)
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
            setSearchover(true);}
            )
    }        
    
    function Extensivesearch() {
        const config = {
            headers:{'Authorization': `Bearer ${token}`}
          };
          const request = axios.get(
            ENDPOINT
            + '/recommendations?seed_artists=' + ArtistID
            + '&target_acousticness=' + Acoustic
            + '&target_liveness=' + Liveness
            , config) 
      
         request
         .then(result => {
            setTracks(result.data.tracks)
         })
         .catch(error => console.log(error))
    }   

    useEffect(() => {
        if (Searchover) {
            Extensivesearch()
        }
    }, [ArtistID])

    useEffect(() => {
        console.log(Tracks)
    }, [Tracks])

//<div> {Dancebility} </div>
//        <input type='range' min={0}  max={100} defaultValue={20} onChange={handleChange} />
  return (
    <div className='App-header-flexh'>
        <div className='child-left'>
        <Slider variable={Dancebility} var_name='Dancebility' handler={(event) => {setDanceability(event.target.value)}} />
        <Slider variable={Acoustic} var_name='Acoustic' handler={(event) => {setAcoustic(event.target.value)}} />
        <Slider variable={Energy} var_name='Energy' handler={(event) => {setEnergy(event.target.value)}} />
        <Slider variable={Instrumentalness} var_name='Instrumentalness' handler={(event) => {setInstrumentalness(event.target.value)}} />
        <Slider variable={Liveness} var_name='Liveness' handler={(event) => {setLiveness(event.target.value)}} />
        <Slider variable={Loudness} var_name='Loudness' handler={(event) => {setLoudness(event.target.value)}} />
        <form action='Search'>
        <input type='text' placeholder='Select an artist' onChange={handleChangeArtist}/>
        </form>
    <button onClick={Search}> SEARCH </button>
        </div>
        <div className='child-right'>
        {Tracks ? <Tracklist tracks={Tracks} token={token}/> : <></>}
        </div>
    </div>
  )
}

export default Advanced