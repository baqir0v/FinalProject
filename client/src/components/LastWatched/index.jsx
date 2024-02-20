import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./index.scss";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link } from "react-router-dom";
import StarRating from '../StarRating';
import { UserContext } from '../../Context/userContext';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";

const LastWatched = () => {
  const [data, setData] = useState([]);
  const { darkmode } = useContext(DarkmodeContext);
  const [userInfo, setUserInfo] = useState([]);
  const { userData } = useContext(UserContext)

  const fetchData = async () => {
    const res = await fetch("http://localhost:5500/api/movies/");
    const jsonData = await res.json();
    setData(jsonData);
  };

  const fetchUserInfo = async () => {
    const resp = await fetch("http://localhost:5500/api/users/")
    const jsonData = await resp.json()
    setUserInfo(jsonData)
  }

  const handleDeleteWatched = async (movieId) => {
    try {
      const userId = userData.userId;
      const data = await axios.put(`http://localhost:5500/api/users/deleteWatched/${userId}`, { movieId });
      console.log(data);
      // Additional actions after updating watched movies
      fetchUserInfo()
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    fetchData();
    fetchUserInfo();
  }, []);

  return (
    <section id='lastwatched' className={darkmode ? "darkmovies" : "lightmovies"}>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {userInfo.map((item) => (
          <div key={item._id}>
            {item.isWatched && item.isWatched.reverse().map((watched) => (
              <SwiperSlide>
                <div className="movies" key={watched._id}>
                  <Link to={`/detail/${watched._id}`} >
                    <span>{watched.name}</span>
                  </Link>
                  <img src={watched.image} alt="" />
                  <button onClick={() => handleDeleteWatched(watched._id)}><FaTrash /></button>
                </div>
              </SwiperSlide>
            ))
            }
          </div>
        ))}

      </Swiper>
    </section>
  );
};

export default LastWatched;