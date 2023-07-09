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
import * as FaIcons from 'react-icons/fa';



//<div className='child-BPM'> {finder(track.audio_features, track.id, 'tempo')} </div>

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
    }//

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
          }}};
    
    const labels = ['D', 'A', 'I', 'Lo', 'Li', 'E'];

    function returnBPM(bpm){
      /*if (bpm > 140) {return bpm/2.}
      else {return bpm}*/
      return bpm
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
                  {track.external_urls.spotify ? <a href={track.external_urls.spotify}><FaIcons.FaSpotify title="Open in Spotify"/></a> : <></>}
                  <PlusButton Playlists={Playlists} TrackURI={track.uri} token={token}/>
                     </div>
            </div>
            <div className='child-graph'> 
              {track.audio_features.danceability ? 
                <Bar options={options} data={{labels, datasets: [{data: [track.audio_features.danceability*100., track.audio_features.acousticness*100.,
                       track.audio_features.instrumentalness*100., track.audio_features.loudness/(-60.), track.audio_features.liveness*100., track.audio_features.energy*100.],
                                              backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)',
                                                                'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)',
                                                                'rgba(201, 203, 207, 0.2)'] }]}}/> : <></>} 
            </div>
            <div className='child-features' title='Beats Per Minute'> {returnBPM(Number(track.audio_features.tempo).toFixed())} </div>  
        </div>

  )
  } else {
    return <></>
  }
}

export default Track