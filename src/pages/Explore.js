import React from 'react'
import axios from 'axios';
import '../App.css';
import { useEffect, useState, useContext } from 'react'
import Tracklist from '../components/Tracklist'
import Select from 'react-select'
import { UserContext } from '../App'

function Explore({ playlists}) {

    const {token, logout, MyPlaylists} = useContext(UserContext);

    const [Playlists, setPlaylists] = useState(playlists)
    const [Playlist, setPlaylist] = useState([])
    const [Tracks, setTracks] = useState([])
    const [Display, setDisplay] = useState(false)
    const [Options, setOptions] = useState()
    
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
            }).catch(error => {console.log(error)
                                logout()})
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
        ImportPlaylist([], event.value, 0)
    }

    useEffect(()=> {
        const options = playlists.map((playlist, index) => {
            return {
               label: playlist.name,
               value: playlist.id,
               key: index
            }
       })
    }, [])
    
    //</Select> : <></>}
    //{playlists.map(playlist => <option value={playlist.id}>{playlist.name}</option>)}

    return (
    <div className='App-header'>
        {playlists ?
        <div className='box'> 
        <Select placeholder='Select a playlist' onChange={(e) => handleChange(e)} options={playlists.map((playlist, index) => {
                                                                return {
                                                                label: playlist.name,
                                                                value: playlist.id,
                                                                key: index
                                                                }})}
                                                            theme={(theme) => ({
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
} /> </div>:<></>}
        
        
        {Display ? <Tracklist tracks={Tracks} token={token} Playlists={MyPlaylists}/> : <></>}
    </div>
  )
}

export default Explore