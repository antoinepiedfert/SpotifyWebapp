import React from 'react'
import '../App.css'
import axios from 'axios';
import {useEffect, useState} from 'react';
import '../components/Tracklist.css'
import Music from '../components/Music'
import Track from '../components/Track'

function Reports({token}) {

  const [Data, setData] = useState([])
  const [DisplayPreviews, setDisplayPreviews] = useState(false)
  const [DisplayBPM, setDisplayBPM] = useState(false)
  const [Ids, setIds] = useState([])
  const [Idstring, setIdstring] = useState('')
  const [Previews, setPreviews] = useState({})
  const [Musicaldata, setMusicaldata] = useState({})
  const [Imported, setImported] = useState(false)
  const [Count, setCount] = useState(0)

  useEffect(() => {
    if (Data.length > 0){
      const Ids_extract = []
      for (let key in Data) {
        Ids_extract.push(Data[key].id)
      }
      setIds(Ids_extract)

      setImported(true)
      }
  }, [Data])

  useEffect(() => {
    if (Data.length > 0){
        BPM()
        Preview()
    }
  }, [Imported])
  
  useEffect(() => {
    if (Previews){
      setDisplayPreviews(true)
    }
  },[Previews])

  useEffect(() => {
    if (Musicaldata){
      setDisplayBPM(true)
    }
  },[Musicaldata])

  function findElementbyId(elem, id, key) {
    if (elem) {
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].id === id) {
        if (key==='tempo' && elem[i][key]>40){
          return elem[i][key]/2
        }
        else {
          return elem[i][key]
        }
      }
    }
  }
}

  function Search() {
    setData([])
    setIds([])
    setPreviews({})
    setMusicaldata({})
    setImported(false)
    setDisplayPreviews(false)
    setDisplayBPM(false)
  
    const config = {
      headers:{'Authorization': `Bearer ${token}`}
    };
    const request = axios.get('https://api.spotify.com/v1/search?q=artist%3Arihanna&type=track&limit=3', config) 

   request
   .then(result => {
     setData(result.data.tracks.items)
   })
   .catch(error => console.error('(1) Inside error:', error))
  }

  function Preview() {
    const config = {
      headers:{'Authorization': `Bearer ${token}`}
    };
    const request = axios.get('https://api.spotify.com/v1/tracks?ids=' + Ids.join('%2C') , config) 

   request
   .then(result => {
      setPreviews(result.data.tracks)
   })
   .catch(error => console.error('(1) Inside error:', error))
  }

  function BPM() {
    const config = {
      headers:{'Authorization': `Bearer ${token}`}
    };
    const request = axios.get("https://api.spotify.com/v1/audio-features?ids=" + Ids.join('%2C'), config) 

   request
   .then(result => {
    setMusicaldata(result.data.audio_features)
    console.log(result.data.audio_features)
   })
   .catch(error => console.error('(1) Inside error:', error))
  }
  
  
  if (DisplayBPM && DisplayPreviews) {
      return <div className='App-header'>
      <form action='Search'>
        <input type='text' placeholder='Select a musical genre' />
        <input type='text' placeholder='Select a BPM' />
        <input type='text' placeholder='Select an artist' />
      </form>
      <button onClick={Search}> SEARCH </button>
      { Data ? <div>
      <ul >
          {Data.map((track) => (
          <li className='tracklist-text'>
            <Track track={track} finder={findElementbyId} audiofeat={Musicaldata} trackdetails={Previews}/>
          </li>
          ))}
           
        </ul>
        </div> : <></>}
    </div>
  } 
  else{

  return (
    <div className='App-header'>
      <form action='Search'>
        <input type='text' placeholder='Select a musical genre' />
        <input type='text' placeholder='Select a BPM' />
        <input type='text' placeholder='Select an artist' />
      </form>
      <button onClick={Search}> SEARCH </button>
      
    </div>
  )
  }
}

export default Reports