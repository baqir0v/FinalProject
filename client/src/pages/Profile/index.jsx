import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'
import { Link } from 'react-router-dom'
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext'

const Profile = () => {
  const { user, userData, setUser } = useContext(UserContext)
  const { darkmode } = useContext(DarkmodeContext)

  const handleLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("nickname")
    setUser(null)
  }

  return (
    <div id='profilepage' className={darkmode ? "darkprofile" : 'lightprofile'}>
      <Navbar />
      {user ?
        <div className='profile'>
          <img src={userData.image} alt="" />
          <div className="userdata">
            <h1>{userData.nickname}</h1>
            <h3>{userData.email}</h3>
            {user ? <Link to={"/login"}>
              <button onClick={() => handleLogOut()}>Log Out</button>
            </Link> : ""}
          </div>
        </div>
        : ""
      }
      <Footer />
    </div>
  )
}

export default Profile