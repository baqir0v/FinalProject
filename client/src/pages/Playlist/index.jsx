import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/userContext';
import './index.scss';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link } from 'react-router-dom';
import ErrorPage from '../Error';
import { Helmet } from "react-helmet-async"

const Playlist = () => {
    const [data, setData] = useState([]);
    const { user, userData } = useContext(UserContext);
    const { darkmode } = useContext(DarkmodeContext);

    const Nickname = userData ? userData.nickname : null;
    let renderAsda = true;

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:5500/api/users/');
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleWishlist = async () => {
        try {
            console.log(userData);
            if (userData && userData.userId && details._id) {
                const res = await axios.put(`http://localhost:5500/api/users/addWishlist/${userData.userId}`, { movieId });
                const userWishlist = res.data.inWishList;

                setIsInWishlist((prev) => !prev);
                if (userWishlist.includes(details._id)) {
                    toast.success('Added To List');
                } else {
                    toast.error('Deleted From List');
                }
                console.log(res.data.inWishList);
            } else {
                console.log("User data or movie details are missing");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    Playlist
                </title>
            </Helmet>
            {user ? (
                <>
                    <div id='list' className={darkmode ? 'darklist' : 'lightlist'}>
                        <Navbar />
                        <div className='playlist'>
                            {data &&
                                data.map((item) => {
                                    if (Nickname === item.nickname && item.inWishList && item.inWishList.length > 0) {
                                        renderAsda = false;
                                        return (
                                            <ul key={item._id}>
                                                {item.inWishList.map((wishlistItem) => (
                                                    <Link to={`/detail/${wishlistItem._id}`} key={wishlistItem._id}>
                                                        <div className='movies'>
                                                            <span>{wishlistItem.name}</span>
                                                            <img src={wishlistItem.image} alt='' />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </ul>
                                        );
                                    }
                                    return null;
                                })}
                            {renderAsda && <h1>Your Playlist is Empty</h1>}
                        </div>
                        <Footer />
                    </div>
                </>
            ) : (
                <ErrorPage />
            )}
        </>
    );
};

export default Playlist;
