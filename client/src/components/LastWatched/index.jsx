import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./index.scss";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link } from "react-router-dom";
import { UserContext } from '../../Context/userContext';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";

const LastWatched = () => {
  const { darkmode } = useContext(DarkmodeContext);
  const { userData } = useContext(UserContext)
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const userId = userData.userId;
      const resp = await axios.get(`http://localhost:5500/api/users/${userId}`);
      const jsonData = resp.data;
      setUserInfo(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const handleDeleteWatched = async (movieId) => {
    try {
      const userId = userData.userId;
      const data = await axios.put(`http://localhost:5500/api/users/deleteWatched/${userId}`, { movieId });
      console.log(data);
      fetchUserInfo();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const breakpoints = {
    200: { slidesPerView: 1, spaceBetween: 10 },
    300: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    1024: { slidesPerView: 4, spaceBetween: 40 }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {
        userInfo.isWatched.length > 0 && (
          <section id='lastwatched' className={darkmode ? "darkmovies" : "lightmovies"}>
            <h1>Last Watched</h1>
            <Swiper
              breakpoints={breakpoints}
              spaceBetween={30}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {userInfo.isWatched.reverse().map((watched) => (
                <SwiperSlide key={watched._id}>
                  <div className="movies">
                    <Link to={`/detail/${watched._id}`}>
                      <span>{watched.name}</span>
                    </Link>
                    <img src={watched.image} alt="" />
                    <button onClick={() => handleDeleteWatched(watched._id)}><FaTrash /></button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        )
      }
    </>
  );
};

export default LastWatched;