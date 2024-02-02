import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext'

const Profile = () => {
  const { user, userData,setUser } = useContext(UserContext)

  const handleLogOut = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("nickname")
    setUser(null)
  }

  return (
    <div>
      {user ?
        <>
          <img src={userData.image} alt="" />
          <h1>{ userData.nickname }</h1>
          <h3>{ userData.email }</h3>
          {user ? <button onClick={()=>handleLogOut()}>Log Out</button> : ""}
        </>
        : ""
      }
    </div>
  )
}

export default Profile