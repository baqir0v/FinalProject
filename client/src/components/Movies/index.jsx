import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "./index.scss"
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


const Movies = () => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await fetch("http://localhost:5500/api/movies/")
    const jsonData = await res.json()
    setData(jsonData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section id='movies'>

      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data && data.map((item) => (
        <SwiperSlide>
          <ul key={item._id}>
            <li className='imgli'><img src={item.image} alt="" /></li>
            <li>{item.name}</li>
            <li>Language:{item.lang}</li>
            <li>
            Category:
            {item.category.map((cat) => (
              <span key={cat._id}>{cat.categoryname}</span>
            ))}
          </li>
          </ul>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Movies