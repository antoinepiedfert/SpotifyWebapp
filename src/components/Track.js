import Music from './Music'
import './Track.css'
import {useState, useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import LikeButton from './LikeButton';
import PlusButton from './PlusButton';
import * as PiIcons from 'react-icons/pi';
import * as TbIcons from 'react-icons/tb';
import * as GiIcons from 'react-icons/gi';
import { IconContext } from "react-icons";
import {fraction} from 'mathjs';

function Track({track, token, Playlists}) {
    
    const [Artists, setArtists] = useState([])

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
        get_artists_names(track.artists)
    })

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    
    const options = {
      plugins: {
          legend: {
              display: false,
          }},
      scales: {
            y: {
                min: 0,
                max: 100,
                display: false
            },
            x: {
              display: true
          }
      }
    };
    
    //const labels = ['Danceable', 'Acoustic', 'Instrumental', 'Live', 'Energy', 'Happy', 'Popular'];
    const labels = ['D', 'A', 'I', 'Li', 'E', 'H', 'P'];
    const musickeys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B', 'B#']

    function returnBPM(bpm){
      /*if (bpm > 140) {return bpm/2.}
      else {return bpm}*/
      return bpm
    }

    function ms_to_min(millis) {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

  if ((track.track_details) && (track.audio_features)) {
  return (
        
        <div className='parent'> 
            <Music url={track.track_details.preview_url} imag={track.track_details.album.images[2].url}/>          
          <div className='child-info'>
              <p className='marquee child-name'> <span>{track.name}</span>  </p>
              <p className='marquee child-artist'> <span>{Artists}</span>  </p>
              <div className='Buttonsbox'> 
                <LikeButton  id={track.id} token={token} like={track.liked}/>
                {track.external_urls.spotify ? <a href={track.external_urls.spotify}><IconContext.Provider value={{ color: "#FBFFF1" }}><PiIcons.PiSpotifyLogoLight title="Open in Spotify"/></IconContext.Provider></a> : <></>}
                <PlusButton Playlists={Playlists} TrackURI={track.uri} token={token}/>
                <font title='Duration' size="4">{ms_to_min(track.duration_ms)}</font >
                <font title={"Release date : " +  track.album.release_date} size="4">{track.album.release_date.split('-')[0]}</font > 
              </div>
          </div>
          <div className='child-graph'> 
              {track.audio_features.id ? 
                <Bar className='graph' options={options} data={{labels, datasets: [{data: [track.audio_features.danceability*100.,
                   track.audio_features.acousticness*100., track.audio_features.instrumentalness*100.,
                   track.audio_features.liveness*100., track.audio_features.energy*100., track.audio_features.valence*100.,
                  track.popularity],
                                              backgroundColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)','rgba(201, 203, 207, 1)',
                                                                'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)',
                                                                'rgba(120, 188, 97, 1)' ] }]}}/> : <></>} 
                 
          </div>
          <div className='featurebox'>
              <div className='child-features' title='Musical key'> 
                <GiIcons.GiMusicalScore/> 
                {musickeys[track.audio_features.key]} {track.audio_features.time_signature}/4
              </div> 
              <div className='child-features' title='Average noise in dB'> 
                <GiIcons.GiScreaming/>
                {Number(track.audio_features.loudness).toFixed()}
              </div>  
              <div className='child-features' title='Beats Per Minute'> 
                <TbIcons.TbActivityHeartbeat/>
                {returnBPM(Number(track.audio_features.tempo).toFixed())}
              </div>  
          </div>
        </div>

  )
  } else {
    return <></>
  }
}

export default Track