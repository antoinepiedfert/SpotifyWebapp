import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios';
import '../App.css'

function Homepage({token}) {

    const [me, setMe] = useState("")


    useEffect(() => {
        searchMe()
      }, [])

    const searchMe = async(e) => {
      if (token) {
          const {data} = await axios.get("https://api.spotify.com/v1/me", 
          {
              headers: {Authorization: `Bearer ${token}`}
          })
          setMe(data)
          console.log(me)
      }
    }

  return (
    <>
    { !me ?<></>:
      <div className='App-header'>
        <img src={me['images'][0]['url']}/>
        Hello, {me['display_name']}
      </div>}
    </>
  )
}

export default Homepage