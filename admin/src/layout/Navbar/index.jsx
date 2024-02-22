import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext'
import { FaBars } from "react-icons/fa";
import { TfiShine } from "react-icons/tfi";
import { MdDarkMode } from "react-icons/md";
import { PiRecordFill } from "react-icons/pi";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { user, userData } = useContext(UserContext)
  const { darkmode, handleDarkmode } = useContext(DarkmodeContext)

  const toggleSideBar = () => {
    setIsNavOpen(!isNavOpen)
  }
  return (
    <nav id='nav' className={darkmode ? "darknav" : "lightnav"}>
      <div className="nav">
        <div className="navbox">
          <div className="navleft">
            <h1><span><PiRecordFill /></span>RecTv</h1>

          </div>
          {/* <div className="navmid">
            <ul>
              <li><NavLink activeclassname='active' to={"/home"}>Home</NavLink></li>
              <li><NavLink to={"/contact"}>Contact</NavLink></li>
              <li><NavLink to={"/addmovie"}>Addmovie</NavLink></li>
              <li>
                {user && userData.isAdmin === true ?
                  <NavLink to={"/admin"}>Admin</NavLink>
                  :
                  ""}
              </li>
            </ul>
          </div> */}
          <div className="navright">
            <div className='themechanger' onClick={handleDarkmode}>
              {darkmode ? <MdDarkMode /> : <TfiShine />}
            </div>
            {user ? <NavLink to={"/profile"}> <img src={userData.image} alt="" /> </NavLink> : ""}
            <span onClick={toggleSideBar}>
              <FaBars />
            </span>
          </div>
        </div>
        <div className={isNavOpen ? "sidebar" : "dnone"}>
          {/* <ul>
            <li><NavLink to={"/home"}>Home</NavLink></li>
            <li><NavLink to={"/contact"}>Contact</NavLink></li>
            <li><NavLink to={"/addmovie"}>Addmovie</NavLink></li>
            <li>
              {user && userData.isAdmin === true ?
                <NavLink to={"/admin"}>Admin</NavLink>
                :
                ""}
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar