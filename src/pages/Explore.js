import React from 'react'
import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react'
import Tracklist from '../components/Tracklist'


function Explore({token, playlists, MyPlaylists}) {

    const [Playlists, setPlaylists] = useState(playlists)
    const [Playlist, setPlaylist] = useState([])
    const [Tracks, setTracks] = useState([])
    const [Display, setDisplay] = useState(false)

    
      const ImportPlaylist = async(playlist, id, offset) => {
        if (token) {
            return await axios.get("https://api.spotify.com/v1/playlists/" + id + "/tracks?limit=50&offset=" + offset, 
            {
                headers: {Authorization: `Bearer ${token}`}
            }).then(response => {
                
                let new_playlist = playlist.concat(response.data.items);

                const nextoffset = offset + 50

                if (response.data.items.length === 50){
                    ImportPlaylist(new_playlist, id, nextoffset)
                } else {
                    setPlaylist(new_playlist)
                }
            }).catch(error => {console.log(error)})
        }
      }

      useEffect(() => {
        let new_Tracks = []
        for (let i = 0 ; i < Playlist.length ; i++) {
            new_Tracks.push(Playlist[i].track)
        }
        setTracks(new_Tracks)
    }, [Playlist]);

    useEffect(() => {
        if (Tracks.length > 0) {
            setDisplay(true)
         }
    }, [Tracks])

    function handleChange(event) {
        setPlaylist([])
        setDisplay(false)
        ImportPlaylist([], event.target.value, 0)
    }
    
    return (
    <div className='App-header'>
        {playlists ?
        <select className='select-box' onChange={(e) => handleChange(e)}>
        {playlists.map(playlist => <option value={playlist.id}>{playlist.name}</option>)}
        </select> : <></>}
        {Display ? <Tracklist tracks={Tracks} token={token} Playlists={MyPlaylists}/> : <></>}
    </div>
  )
}

export default Explore