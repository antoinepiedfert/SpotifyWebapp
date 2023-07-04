import React from 'react'
import { useEffect, useState } from 'react'
import '../App.css'
import '../components/Advanced.css'
import Slider from '../components/Slider'
import axios from 'axios';
import Tracklist from '../components/Tracklist'

function Advanced( {token} ) {

    const ENDPOINT = 'https://api.spotify.com/v1'

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


    const handleChangeArtist = (event) => {
        const artist = event.target.value
        setArtist(artist)
      }

    function Search() {
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
            setSearchover(true);}
            )
    }        
    
    function Extensivesearch() {
        console.log(Artist, ArtistID)
        const config = {
            headers:{'Authorization': `Bearer ${token}`}
          };
          const request = axios.get(
            ENDPOINT
            + '/recommendations?seed_artists=' + ArtistID + Url
            , config) 
      
         request
         .then(result => {
            console.log('result')
            setTracks(result.data.tracks)
         })
         .catch(error => console.log(error))
    }   

    useEffect(() => {
        if (Searchover) {
            Extensivesearch()
        }
    }, [Searchover])

    useEffect(() => {
        console.log(Tracks)
    }, [Tracks])

    useEffect(() => {
        let newUrl = ''
        if (CheckD) {newUrl += '&target_danceability=' + Danceability/100.}
        if (CheckA) {newUrl += '&target_acousticnessness=' + Acousticness/100.}
        if (CheckLi) {newUrl += '&target_liveness=' + Liveness/100.}
        if (CheckLo) {newUrl += '&target_loudness=' + Loudness/100.}
        if (CheckI) {newUrl += '&target_instrumentalness=' + Instrumentalness/100.}
        if (CheckE) {newUrl += '&target_energy=' + Energy/100.}
        
        setUrl(newUrl) //.replace('.', '%2E')
        console.log(newUrl)

    }, [CheckD, CheckE, CheckLi, CheckLo, CheckI, CheckA, Danceability, Acousticness, Liveness, Loudness, Instrumentalness, Energy])

  return (
    <div className='App-header-flexh'>
        <div className='child-left'>
        <Slider variable={Danceability} var_name='Danceability' handler={(event) => {setDanceability(event.target.value)}} clicker={() => setCheckD(!CheckD)} />
        <Slider variable={Acousticness} var_name='Acousticness' handler={(event) => {setAcousticness(event.target.value)}} clicker={() => setCheckA(!CheckA)}/>
        <Slider variable={Energy} var_name='Energy' handler={(event) => {setEnergy(event.target.value)}} clicker={() => setCheckE(!CheckE)}/>
        <Slider variable={Instrumentalness} var_name='Instrumentalness' handler={(event) => {setInstrumentalness(event.target.value)}} clicker={() => setCheckI(!CheckI)}/>
        <Slider variable={Liveness} var_name='Liveness' handler={(event) => {setLiveness(event.target.value)}} clicker={() => setCheckLi(!CheckLi)}/>
        <Slider variable={Loudness} var_name='Loudness' handler={(event) => {setLoudness(event.target.value)}} clicker={() => setCheckLo(!CheckLo)}/>
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