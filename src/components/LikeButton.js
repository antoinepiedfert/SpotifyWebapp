import React from 'react'
import { useEffect, useState } from 'react'
import * as AiIcons from 'react-icons/ai';

import axios from 'axios';

function LikeButton({id, token, like}) {

    const [Liked, setLiked] = useState(like)
    const [Found, setFound] = useState(false)

    function toggle () {
        setLiked(!Liked)
        if (Liked) {remove_like()}
        if (!Liked) {add_like()}
    }

   /* useEffect(() => {
        if (!Found){
        const config = {
            headers:{'Authorization': `Bearer ${token}`}
          };
          const request = axios.get('https://api.spotify.com/v1/me/tracks/contains?ids=' + id, config) 
      
         request
         .then(result => {
            setLiked(result.data[0])
            setFound(true)
         })
         .catch(error => {
            console.error('error in check for like')
            }
            )
    }})*/

    function add_like(){
        const config = {
            headers:{'Authorization': `Bearer ${token}`,
                     'Content-Type':'application/json'}            
          };

          const request = axios.put('https://api.spotify.com/v1/me/tracks?ids=' + id, {"ids": [id]}, config) 

          request
         .then(result => {
            setLiked(true)
            console.log('added like', id)
         })
         .catch(error => {
            console.error(error, 'error in add function')
            }
        )
    }

    function remove_like(){    
        const config = {
            headers:{'Authorization': `Bearer ${token}`,
                     'Content-Type':'application/json'},
            data: {"ids": [id]}           
          };

          const request = axios.delete('https://api.spotify.com/v1/me/tracks?ids=' + id, config) 

          request
         .then(result => {
            setLiked(false)
         })
         .catch(error => {
            console.error(error, 'error in add function')
            }
            )
    }

  return (<>
    {!Liked ? <AiIcons.AiOutlineHeart onClick={toggle}/> : <AiIcons.AiFillHeart onClick={toggle}/>}
    
    </>
  )
}

export default LikeButton