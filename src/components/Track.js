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


//<div className='child-BPM'> {finder(audiofeat, track.id, 'tempo')} </div>

function Track({track, finder, audiofeat, trackdetails}) {

    const [Artists, setArtists] = useState([])
    console.log(audiofeat)
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
      responsive: true,
      plugins: {
        
      },
    };
    
    const labels = ['D', 'A', 'I', 'Lo', 'Li', 'E'];
    
     const data = {
      labels,
      datasets: [
        
        {
          data: [50, 25, 12, 74, 96, 1],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    if (trackdetails && audiofeat) {
  return (
    <div >   
        <div className='parent'> 
        <Music className='child-icon' url={finder(trackdetails, track.id, 'preview_url')}/>
            <div className='child-info'>
                <div className='child-name'> {track.name} </div>
                <div className='child-artist'> {Artists} </div>
            </div>
            <div className='child-graph'> <Bar options={options} data={data}/>; </div>
            <div className='child-features'> {Number(finder(audiofeat, track.id, 'tempo')).toFixed()} </div>
        </div>
    </div>
  )
  } else {
    return <></>
  }
}

export default Track