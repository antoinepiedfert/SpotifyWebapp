import React from 'react'
import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react'
import Tracklist from '../components/Tracklist'


function Explore({token}) {

    const [Playlists, setPlaylists] = useState()
    const [Playlist, setPlaylist] = useState([])
    const [Tracks, setTracks] = useState([])

    const searchMe = async(e) => {
        if (token) {
            return await axios.get("https://api.spotify.com/v1/me", 
            {
                headers: {Authorization: `Bearer ${token}`}
            }).then(response => {
                searchMyplaylists(response.data.id) 
            })
            
        }
      }

      const searchMyplaylists = async(id) => {
        if (token) {
            return await axios.get("https://api.spotify.com/v1/users/" + id + "/playlists?limit=50", 
            {
                headers: {Authorization: `Bearer ${token}`}
            }).then(response => {
                setPlaylists(response.data.items)
            })
        }
      }

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
        searchMe()
      }, []);

      useEffect(() => {
        let new_Tracks = []
        for (let i = 0 ; i < Playlist.length ; i++) {
            new_Tracks.push(Playlist[i].track)
        }
        setTracks(new_Tracks)
    }, [Playlist]);

    function handleChange(event) {
        setPlaylist([])
        ImportPlaylist([], event.target.value, 0)
    }
    
    return (
    <div className='App-header'>
        {Playlists ?
        <select className='select-box' onChange={(e) => handleChange(e)}>
        {Playlists.map(playlist => <option value={playlist.id}>{playlist.name}</option>)}
        </select> : <></>}
        {Tracks ? <Tracklist tracks={Tracks} token={token}/> : <></>}
    </div>
  )
}

export default Explore