import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext';

const Slider = () => {
    const { darkmode } = useContext(DarkmodeContext);
    const [data, setData] = useState([])

    const fetchData = async () => {
        const res = await fetch("http://localhost:5500/api/swiper/")
        const jsonData = await res.json()
        setData(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div id='slider' className={darkmode ? "darkslider" : "lightslider"}>

            <div className="slider">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {data && data.map((item) => (
                        <SwiperSlide key={item._id}>
                            <img src={item.swiperimage} alt="" />
                            <h2>{item.swipername}</h2>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Slider