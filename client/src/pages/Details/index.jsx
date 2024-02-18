import React, { useContext, useEffect, useRef, useState } from 'react'
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
import StarRating from '../../components/StarRating';
import { MdMovieFilter } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaStar } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
    const [details, setDetails] = useState([])
    const { id } = useParams()
    const { darkmode } = useContext(DarkmodeContext)
    const { userData } = useContext(UserContext)
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isRateOpen, setIsRateOpen] = useState(false)
    const [selectedRating, setSelectedRating] = useState(1); 
    const movieId = details._id
    const [isTrailerOpen, setIsTrailerOpen] = useState(false)
    
    const openRate = () => {
        setIsRateOpen(!isRateOpen)
    }

    const openTrailer = ()=>{
        setIsTrailerOpen(!isTrailerOpen)

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

    const handleWishlist = async () => {
        try {
            console.log(userData);
            if (userData && userData.userId && details._id) {
                const res = await axios.put(`http://localhost:5500/api/users/addWishlist/${userData.userId}`, { movieId });
                const userWishlist = res.data.inWishList

                setIsInWishlist((prev) => !prev);  
                if (userWishlist.includes(details._id)) {
                    // console.log("Movie deleted from wishlist");
                    toast.success('Added To List');
                } else {
                    // console.log("Movie added to wishlist successfully");
                    toast.error('Deleted From List');
                }
                console.log(res.data.inWishList);
            } else {
                console.log("User data or movie details are missing");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRate = async () => {
        try {
            console.log(selectedRating);
            if (selectedRating && userData && userData.userId && details._id) {
                const res = await axios.put(`http://localhost:5500/api/movies/rate/${details._id}`, {
                    movieId: details._id,
                    userId: userData.userId,
                    newRating: selectedRating
                });
                const updatedDetails = res.data;
                setDetails(updatedDetails);
                console.log(res.data);
                fetchData()
            } 
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const averageRating = details.ratings ? details.ratings.reduce((total, rating) => total + rating.rating, 0) / details.ratings.length : 0;
    console.log(averageRating);
    return (
        <div id='detailpage' className={darkmode ? "darkdetail" : "lightdetail"}>
             <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <div className={isTrailerOpen ? "watchtrailer" : "dnone"}>
                <div className="trailervideo">
                <span className='closer' onClick={openTrailer}><IoMdClose /></span>
                <iframe src={details.trailer}></iframe>
                </div>
            </div>
            <div className={isRateOpen ? "ratewithstars" : "dnone"}>
                <div className="stars">
                    <span className='closer' onClick={openRate}><IoMdClose /></span>
                    <select class="minimal" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                        <option value='1'>★</option>
                        <option value='2'>★★</option>
                        <option value='3'>★★★</option>
                        <option value='4'>★★★★</option>
                        <option value='5'>★★★★★</option>
                    </select>
                    <button class="button-9" role="button" onClick={handleRate}>Rate</button>
                </div>
            </div>
            <Navbar />
            {details ?
                <>
                    <div className='details'>
                        <div style={{ backgroundImage: `url(${details.detailImage})` }} className='bgimg'>
                            <h1>{details.name}</h1>
                            <div className='player'>
                                <Link to={`/video/${details._id}`}>
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
                                            {details.ratings && details.ratings.length > 0 ? (
                                                <StarRating rating={averageRating} />
                                            ) : (
                                                <StarRating rating={averageRating} />
                                            )}
                                        </li>|
                                        <li>IMDB:{details.imdb}</li>|
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
                                <div className="trailer" onClick={openTrailer}>
                                    <MdMovieFilter />
                                    <p>Trailer</p>
                                </div>
                                <div className={`addtolist ${isInWishlist ? 'inWishlist' : ''}`} onClick={() => handleWishlist(movieId)}>
                                    <MdOutlineDone />
                                    <p>Add To My List</p>
                                </div>
                                <div className="rate" onClick={openRate}>
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
