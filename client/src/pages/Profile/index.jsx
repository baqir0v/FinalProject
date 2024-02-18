import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/userContext';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';
import { DarkmodeContext } from '../../Context/darkmodeContext';


const Profile = () => {
  const { user, userData, setUser, updateUserImage } = useContext(UserContext);
  const [data, setData] = useState([])
  const { darkmode } = useContext(DarkmodeContext);
  const [image, setImage] = useState(null);


  const fetchData = async () => {
    const resp = await fetch("http://localhost:5500/api/users/")
    const jsonData = await resp.json()
    setData(jsonData)
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    setUser(null);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    try {
      if (!image) {
        console.error('No image selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.put(`http://localhost:5500/api/users/updateImage/${userData.userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Update UserContext with the new user data, including the updated image
      setUser(response.data);
      updateUserImage(response.data.image);

      // Reset the image state
      setImage(null);
      console.log("Image updated successfully");
      fetchData()
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  return (
    <div id='profilepage' className={darkmode ? 'darkprofile' : 'lightprofile'}>
      <Navbar />
      {data.map((item) => (
      item.nickname === userData.nickname && (
        <div key={item.id} className='profile'>
          <img src={item.image } alt='' />
          <div className='userdata'>
            <h1>{item.nickname}</h1>
            <h3>{item.email}</h3>

            {/* Image upload form */}
            <input type='file' accept='image/*' onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Update Image</button>

            {/* Logout button */}
            <Link to='/login'>
              <button onClick={handleLogOut}>Log Out</button>
            </Link>
          </div>
        </div>
      )
    ))}
      <Footer />
    </div>
  );
};

export default Profile;
