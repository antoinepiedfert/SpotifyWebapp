import React, { useEffect, useState } from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import { Link } from "react-router-dom";
import { SidebarData } from './SidebarData';
import './Navbar.css';
import '../App.css'

function Navbar({logout, token}) {
    
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)

  return (
    <div>
        <div className="navbar">
            <Link to="#" className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} height='100%'/>
            </Link>
            {token ? <div className="buttonbox">
                <button className='button-34' onClick={logout}>logout</button>
            </div>  : <></>}
        </div>
        
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-meny-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                    <Link to='#' className='menu-bars'>
                        <AiIcons.AiOutlineClose />
                    </Link>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            </nav>
    </div>
  )
}

export default Navbar