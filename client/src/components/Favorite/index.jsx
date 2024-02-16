import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./index.scss";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link } from "react-router-dom";
import StarRating from '../StarRating';

const Favorites = () => {
    const [data, setData] = useState([]);
    const { darkmode } = useContext(DarkmodeContext);

    const fetchData = async () => {
        const res = await fetch("http://localhost:5500/api/movies/");
        const jsonData = await res.json();
        const filteredData = jsonData.filter(item => item.imdb >= 8);
        setData(filteredData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section id='movies' className={darkmode ? "darkmovies" : "lightmovies"}>
            Favorite
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {data.map((item) => {
                    const averageRating = item.ratings ? item.ratings.reduce((total, rating) => total + rating.rating, 0) / item.ratings.length : 0;

                    return (
                        <SwiperSlide key={item._id}>
                            <Link to={`/detail/${item._id}`}>
                                <ul>
                                    <li className='imgli'><img src={item.image} alt="" /></li>
                                    <li>{item.name}</li>
                                    <li>Language: {item.lang}</li>
                                    {/* <li className='catli'>
                      Category: {item.category.map((cat, index) => (
                        <span key={cat._id}>
                          {cat.categoryname}
                          {index < item.category.length - 1 && ','}
                        </span>
                      ))}
                    </li> */}
                                    <li>
                                        {item.ratings && item.ratings.length > 0 ? (
                                            <StarRating rating={averageRating} />
                                        ) : (
                                            <StarRating rating={averageRating} />
                                        )}
                                    </li>
                                </ul>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
};

export default Favorites;
