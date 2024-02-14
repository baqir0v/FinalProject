import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "./index.scss"
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import {Link} from "react-router-dom"


const Movies = () => {
  const [data, setData] = useState([])
  const { darkmode } = useContext(DarkmodeContext)

  const fetchData = async () => {
    const res = await fetch("http://localhost:5500/api/movies/")
    const jsonData = await res.json()
    setData(jsonData)
  }

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <section id='movies' className={darkmode ? "darkmovies" : "lightmovies"}>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data && data.map((item) => (
          <SwiperSlide>
            <Link to={`/detail/${item._id}`}> <ul key={item._id}>
              <li className='imgli'><img src={item.image} alt="" /></li>
              <li>{item.name}</li>
              <li>Language:{item.lang}</li>
              <li className='catli'>
                Category: {item.category.map((cat, index) => (
                  <span key={cat._id}>
                    {cat.categoryname}
                    {index < item.category.length - 1 && ',' /* Add comma if not the last item */}
                  </span>
                ))}
              </li>
            </ul>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Movies