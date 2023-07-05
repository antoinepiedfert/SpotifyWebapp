import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Reports from './pages/Reports'
import Askchatgpt from './pages/Askchatgpt'
import Advanced from './pages/Advanced'
import Navbar from './components/Navbar';
import './pages/Homepage.css';
import {useEffect, useState} from 'react';

function App() {
  const CLIENT_ID = "3f7ff583423148ddbc94e907e1e604df"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = ["user-library-read", "playlist-read-private", "user-read-playback-state", "user-modify-playback-state"]

  const [token, setToken] = useState("")

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

  const logout = () => {
      console.log('destroying token')
      setToken("")
      window.localStorage.removeItem("token")
  }

  return (
  <div>
    <Router>
        <Navbar logout={logout} token={token}/>
        {!token? <div className='App-header'>
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE.join('%20')}&response_type=${RESPONSE_TYPE}`}>Login
                      to Spotify</a>
                  </div>:
        <Routes>
            <Route path='/' exact element={<Homepage token={token}/>}/>
            <Route path='/search' element={<Reports token={token}/>}/>
            <Route path='/askchatgpt' element={<Askchatgpt/>}/>
            <Route path='/inspiration' element={<Advanced token={token}/>}/>
        </Routes>}
    </Router> 
    
  </div>
    
  );
}

export default App;
