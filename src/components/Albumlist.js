import React from 'react';
import Album from './Album';

function Albumlist({albums, token, playlists}) {



  return (
    <ul >
    {albums.map((album) => (
    <li className='tracklist-text'>
    <Album token={token} album={album} playlists={playlists} />
    </li>
    ))}
     
  </ul>
  )
}

export default Albumlist