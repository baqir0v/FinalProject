import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext'
import { FaBars } from "react-icons/fa";
import { TfiShine } from "react-icons/tfi";
import { MdDarkMode } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";
import { PiRecordFill } from "react-icons/pi";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { user, userData } = useContext(UserContext)
  const { darkmode, handleDarkmode } = useContext(DarkmodeContext)
  const [data, setData] = useState([])

  const fetchData = async () => {
    const resp = await fetch("http://localhost:5500/api/users/")
    const jsonData = await resp.json()
    setData(jsonData)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
          <div className="navmid">
            <ul>
              <li><NavLink activeclassname='active' to={"/home"}>Home</NavLink></li>
              <li><NavLink to={"/movies"}>Movies</NavLink></li>
              <li><NavLink to={"/kids"}>Kids</NavLink></li>
              <li><NavLink to={"/contact"}>Contact</NavLink></li>
              {/* <li><NavLink to={"/addmovie"}>Addmovie</NavLink></li>
              <li>
                {user && userData.isAdmin === true ?
                  <NavLink to={"/admin"}>Admin</NavLink>
                  :
                  ""}
              </li> */}
            </ul>
          </div>
          <div className="navright">
            <div className='themechanger' onClick={handleDarkmode}>
              {darkmode ? <MdDarkMode /> : <TfiShine />}
            </div>
            <Link to={"/playlist"}><BiSolidMoviePlay /></Link>
            {/* {user ? <NavLink to={"/profile"}> <img src={userData.image} alt="" /> </NavLink> : ""} */}
            {data.map((item) => (
              item.nickname === userData.nickname && (
                <p>
                  <NavLink to={"/profile"}>
                    {item.image ?
                      <img key={item._id} src={item.image} alt='' />
                      :
                      <p>
                        <img
                          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png'
                          alt=''
                        />
                      </p>
                    }
                  </NavLink>
                </p>
              )
            ))}
            <span onClick={toggleSideBar}>
              <FaBars />
            </span>
          </div>
        </div>
        <div className={isNavOpen ? "sidebar" : "dnone"}>
          <ul>
            <li><NavLink to={"/home"}>Home</NavLink></li>
            <li><NavLink to={"/movies"}>Movies</NavLink></li>
            <li><NavLink to={"/kids"}>Kids</NavLink></li>
            <li><NavLink to={"/contact"}>Contact</NavLink></li>
            {/* <li><NavLink to={"/addmovie"}>Addmovie</NavLink></li>
            <li>
              {user && userData.isAdmin === true ?
                <NavLink to={"/admin"}>Admin</NavLink>
                :
                ""}
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar