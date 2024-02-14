import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext'
import { FaPlay } from "react-icons/fa";
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { MdOutlineDone } from "react-icons/md";
import { MdThumbUp } from "react-icons/md";
import axios from "axios"
import { UserContext } from '../../Context/userContext';

const Details = () => {
    const [details, setDetails] = useState([])
    const { id } = useParams()
    const { darkmode } = useContext(DarkmodeContext)
    const { userData } = useContext(UserContext)
    const movieId = details._id


    const handleWishlist = async () => {
        try {
            console.log(userData);
            // console.log(details._id);
            if (userData && userData.userId && details._id) {
                const res = await axios.put(`http://localhost:5500/api/users/addWishlist/${userData.userId}`, { movieId });
                const userWishlist = res.data.inWishList
                if (userWishlist.includes(movieId)) {
                    console.log("Movie deleted from wishlist");
                } else {
                    console.log("Movie added to wishlist successfully");
                }
                console.log(res.data.inWishList);
            } else {
                console.log("User data or movie details are missing");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            const resp = await fetch(`http://localhost:5500/api/movies/${id}`)
            const jsonData = await resp.json()
            setDetails(jsonData)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div id='detailpage' className={darkmode ? "darkdetail" : "lightdetail"}>
            <Navbar />
            {details ?
                <>
                    <div className='details'>
                        <div style={{ backgroundImage: `url(${details.detailImage})` }} className='bgimg'>
                            <h1>{details.name}</h1>
                            <div className='player'>
                                <Link to={details.video}>
                                    <FaPlay />

                                </Link>
                            </div>
                        </div>
                        <div className="moviemain">
                            <div className="about">
                                <div className="left">
                                    <h2>{details.name}</h2>
                                    <ul>
                                        <li>{details.year}</li>|
                                        <li>{details.ageLimit}+</li>|
                                        <li>{details.lang}</li>|
                                        <li>
                                            {details.category && details.category.length > 0
                                                ? details.category.map((cat, index) => (
                                                    <span key={cat._id}>
                                                        {cat.categoryname}
                                                        {index < details.category.length - 1 && ','}
                                                    </span>
                                                ))
                                                : 'No categories'}
                                        </li>
                                    </ul>
                                </div>
                                <div className="right">
                                    <h3>Description</h3>
                                    <p>{details.desc}</p>
                                </div>
                            </div>
                            <div className="rating">
                                <div className="addtolist" onClick={() => handleWishlist(movieId)}>
                                    <MdOutlineDone />
                                    <p>Add To My List</p>
                                </div>
                                <div className="rate">
                                    <MdThumbUp />
                                    <p>Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cast">

                        <>
                            {details.cast && details.cast.length > 0
                                ? details.cast.map((cast, index) => (
                                    <span key={cast._id}>
                                        <img src={cast.image} alt="" />
                                        <h3>{cast.castName}</h3>
                                    </span>
                                ))
                                : ''}

                        </>
                    </div>
                </>
                : ""}
            <Footer />
        </div>
    )
}

export default Details