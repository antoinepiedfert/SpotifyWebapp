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
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Unfolder from './Unfolder'

//<div className='child-BPM'> {finder(audiofeat, track.id, 'tempo')} </div>

function Track({track, audiofeat, trackdetails, token, like}) {

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
//<AiIcons.AiOutlinePlus/>
  if ((trackdetails) && (audiofeat)) {
  return (

        <div className='parent'> 
        <Music url={trackdetails.preview_url} imag={trackdetails.album.images[2].url}/>
            <div className='child-info'>
                <p className='marquee child-name'> <span>{track.name}</span>  </p>
                <p className='marquee child-artist'> <span>{Artists}</span>  </p>
                <div className='Buttonsbox'> 
                  <LikeButton  id={track.id} token={token} like={like}/>
                  {track.external_urls.spotify ? <a href={track.external_urls.spotify}><FaIcons.FaSpotify /></a> : <></>}
                  <Unfolder/>
                     </div>
            </div>
            <div className='child-graph'> 
              {audiofeat.danceability ? 
                <Bar options={options} data={{labels, datasets: [{data: [audiofeat.danceability*100., audiofeat.acousticness*100.,
                       audiofeat.instrumentalness*100., audiofeat.loudness/(-60.), audiofeat.liveness*100., audiofeat.energy*100.],
                                              backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)',
                                                                'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)',
                                                                'rgba(201, 203, 207, 0.2)'] }]}}/> : <></>} 
            </div>
            <div className='child-features'> {returnBPM(Number(audiofeat.tempo).toFixed())} </div>  
        </div>

  )
  } else {
    return <></>
  }
}

export default Track