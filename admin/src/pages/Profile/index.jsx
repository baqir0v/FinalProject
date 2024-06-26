import React, { useContext } from 'react';
import { UserContext } from '../../Context/userContext';
import { Link } from 'react-router-dom';
import "./index.scss";
import { DarkmodeContext } from '../../Context/darkmodeContext';
import Navbar from '../../layout/Navbar';
import Nav from '../../layout/Nav';
import Errorpage from '../Error';
import {Helmet} from "react-helmet-async"

const Profile = () => {
  const { user, userData, setUser } = useContext(UserContext);
  const { darkmode } = useContext(DarkmodeContext);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    setUser(null);
  };

  return (
    userData.isAdmin === true ? (
      <div id='profilepage' className={darkmode ? "darkprofile" : 'lightprofile'}>
        <Helmet>
          <title>
            Profile
          </title>
        </Helmet>
        <Navbar />
        <div className='profile'>
          <Nav />
          <div className="usersprofile">
            <img src={userData.image} alt="" />
            <div className="userdata">
              <h1>{userData.nickname}</h1>
              <h3>{userData.email}</h3>
              <Link to="/">
                <button className="button-29" onClick={handleLogOut}>Log Out</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Errorpage />
    )
  );
};

export default Profile;
