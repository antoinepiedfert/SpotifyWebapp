import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import * as AiIcons from 'react-icons/ai';
import axios from 'axios';

export default function PlusButton({token, Playlists, TrackURI}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const handleClickMenu = (event) => {
    const PlaylistID = event.target.id
    const uri = TrackURI.replace(':','%3A')
    const data = {
        "uris": [TrackURI],
        "position": 0
    }


    const config = {
        headers:{'Authorization': `Bearer ${token}`,
                 'Content-Type':'application/json'}            
      };

      const request = axios.post("https://api.spotify.com/v1/playlists/" + PlaylistID + "/tracks", data, config) 

      request
     .then(result => {
        console.log(result)
     })
     .catch(error => {
        console.error(error, 'error in add function')
        }
    );
  };



  return (
    <div>
      <AiIcons.AiOutlinePlus className='PlusButton' title="Add to playlist"
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      </AiIcons.AiOutlinePlus >
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {Playlists.map((playlist) => (
        <MenuItem  onClick={handleClickMenu} id={playlist.id}>{playlist.name}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}