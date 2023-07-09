import React from 'react'
import {useEffect, useState} from 'react';
import axios from 'axios';
import '../App.css'

function Homepage({Me}) {

 console.log(Me)
  return (
    <>
      <div className='App-header'>
        <img src={Me.images[0].url}/>
        Hello, {Me.display_name}
      </div>
    </>
  )
}

export default Homepage