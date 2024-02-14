import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user, userData, setUser } = useContext(UserContext)

  const handleLogOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("nickname")
    setUser(null)
  }

  return (
    <div>
      <Navbar />
      {user ?
        <>
          <img src={userData.image} alt="" />
          <h1>{userData.nickname}</h1>
          <h3>{userData.email}</h3>
          {user ? <Link to={"/login"}>
            <button onClick={() => handleLogOut()}>Log Out</button>
          </Link> : ""}
        </>
        : ""
      }
      <Footer />
    </div>
  )
}

export default Profile