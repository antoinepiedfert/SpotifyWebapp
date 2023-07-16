import './Album.css'
import {useState, useEffect} from 'react';
import { IconContext } from "react-icons";
import * as PiIcons from 'react-icons/pi';
import * as VscIcons from 'react-icons/vsc';
import axios from 'axios';
import Tracklist from './Tracklist'

function Album({album, token, playlists}) {
    
    const [Artists, setArtists] = useState([])
    const [Unfold, setUnfold] = useState(false)
    const [Tracks, setTracks] = useState([])

    function get_artists_names (artists) {
        const temp_artists = []
        if (artists){
        for (let i = 0 ; i < artists.length ; i++ ) {
            
          temp_artists.push(artists[i].name)
        }
        setArtists(temp_artists.join(', '))
    }
    }

    useEffect(() => {
        get_artists_names(album.artists)
    })

    function unfold() {
      const config = {headers:{'Authorization': `Bearer ${token}`}};
      const request = axios.get('https://api.spotify.com/v1/albums/' + album.id , config) 

      request.then(result => {let tracks = result.data.tracks.items
                              console.log(result.data.tracks.items)
                              for (let i=0 ; i<tracks.length ; i++) {tracks[i].album = album}
                              console.log(tracks)
                              setTracks(tracks)})

      
    }

    useEffect(() => { 
      console.log(Tracks)
      if (Tracks.length > 0) {
      setUnfold(!Unfold)} }, [Tracks])

//<LikeButton  id={album.id} token={token} like={album.liked}/>

  return (
    <div>
        <div className='parent'> 
          <img src={album.images[2].url}/>          
          <div className='child-info'>
              <p className='marquee child-name'> <span>{album.name}</span>  </p>
              <p className='marquee child-artist'> <span>{Artists}</span>  </p>
              <div className='Buttonsbox'> 
                {album.external_urls.spotify ? <a href={album.external_urls.spotify}><IconContext.Provider value={{ color: "#FBFFF1" }}><PiIcons.PiSpotifyLogoLight title="Open in Spotify"/></IconContext.Provider></a> : <></>}
                <font title={"Release date : " +  album.release_date} size="4">{album.release_date.split('-')[0]}</font > 
              </div>
          </div>
          {!Unfold ? <VscIcons.VscFoldDown title='See tracks' className='LikeButton' onClick={unfold}/> :
                    <VscIcons.VscFoldUp title='Hide tracks' className='LikeButton' onClick={unfold}/> }
        </div>
  
        {Unfold ?<Tracklist tracks={Tracks} token={token} Playlists={playlists}/> : <div></div>}
    </div>
       

  )
 
}

export default Album