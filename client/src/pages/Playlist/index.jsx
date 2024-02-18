import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext';
import './index.scss'
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link } from 'react-router-dom';

const Playlist = () => {
    const [data, setData] = useState([]);
    const { user, userData } = useContext(UserContext)
    const { darkmode } = useContext(DarkmodeContext);

    const Nickname = userData.nickname
    console.log(Nickname);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:5500/api/users/');
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id='list' className={darkmode ? "darklist" : "lightlist"}>
            <Navbar />
            <div className="playlist">
                {data && data.map((item) => (
                    Nickname === item.nickname && (
                        <ul key={item._id}>
                            {item.inWishList.map((wishlistItem) => (
                                <Link to={`/detail/${wishlistItem._id}`}>
                                    <div className="movies" key={wishlistItem._id}>
                                        <span >{wishlistItem.name}</span>
                                        <img src={wishlistItem.image} alt="" />
                                    </div>
                                </Link>
                            ))}
                        </ul>
                    )
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Playlist