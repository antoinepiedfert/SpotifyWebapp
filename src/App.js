import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Reports from './pages/Reports'
import Askchatgpt from './pages/Askchatgpt'
import Advanced from './pages/Advanced'
import Explore from './pages/Explore'
import Navbar from './components/Navbar';
import './pages/Homepage.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
    const CLIENT_ID = "3f7ff583423148ddbc94e907e1e604df"
    const REDIRECT_URI = "http://localhost:3000"//"https://antoinepiedfert.github.io/SpotifyWebapp" 
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = ["user-library-read", "playlist-read-private", "user-read-playback-state", "user-modify-playback-state", "user-library-modify", "playlist-read-collaborative", "playlist-modify-public", "playlist-modify-private"]

    const [token, setToken] = useState("")
    const [Me, setMe] = useState()
    const [Playlists, setPlaylists] = useState()
    const [MyPlaylists, setMyPlaylists] = useState()
    const [Display, setDisplay] = useState(false)

    useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")

      window.localStorage.setItem('me', '')

      if (!token && hash) {
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

          window.location.hash = ""
          window.localStorage.setItem("token", token)
      }

      setToken(token)
    }, [])


    useEffect(() => {
      searchMe()
    }, [token])

    useEffect(() => {
        searchMyPlaylists()
      }, [Me])

    useEffect(() => {
    if (Playlists && Me){
        let new_Myplaylists = []
        for (let i=0 ; i<Playlists.length ; i++){
            if (Playlists[i].owner.display_name === Me.display_name) {
                new_Myplaylists.push(Playlists[i])
            }
            setMyPlaylists(new_Myplaylists)
        }

        setDisplay(true)}
      }, [Playlists])

  const searchMe = async(e) => {
    if (token) {
        await axios.get("https://api.spotify.com/v1/me", 
        {
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {setMe(response.data)})
    }
  }

  const searchMyPlaylists = async(e) => {
    if (token) {
        return await axios.get("https://api.spotify.com/v1/users/" + Me.id + "/playlists?limit=50", 
        {
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            setPlaylists(response.data.items)
            console.log(response.data.item)
        })
    }
  }

  const logout = () => {
      console.log('destroying token')
      setToken("")
      setDisplay(false)
      window.localStorage.removeItem("token")
  }

  return (
  <div>
    <Router>
        <Navbar logout={logout} token={token}/>
        {!Display? <div className='App-header'>
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE.join('%20')}&response_type=${RESPONSE_TYPE}`}>Login
                      to Spotify</a>
                  </div>:
        <Routes>
            <Route path='/' exact element={<Homepage Me={Me}/>}/>
            <Route path='/search' element={<Reports token={token} Playlists={MyPlaylists}/>}/>
            <Route path='/askchatgpt' element={<Askchatgpt/>}/>
            <Route path='/inspiration' element={<Advanced token={token} Playlists={MyPlaylists}/>}/>
            <Route path='/explore' element={<Explore token={token} playlists={Playlists} MyPlaylists={MyPlaylists}/>}/>
        </Routes>}
    </Router> 
    
  </div>
    
  );
}

export default App;
