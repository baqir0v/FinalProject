import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link, NavLink } from 'react-router-dom';
import "./index.scss";
import axios from 'axios';
import Nav from '../../layout/Nav';
import Errorpage from '../Error';
import { UserContext } from '../../Context/userContext';
import { Helmet } from "react-helmet-async"

const SwipePage = () => {
    const { darkmode } = useContext(DarkmodeContext);
    const [data, setData] = useState([]);
    const { userData } = useContext(UserContext)
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(null)

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:5500/api/swiper/");
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching swiper data:', error);
        }
    };

    const deleteData = async (_id) => {
        try {
            const res = await axios.delete(`http://localhost:5500/api/swiper/${_id}`);
            fetchData()
        } catch (error) {
            console.error('Error fetching swiper data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    SwipePage
                </title>
            </Helmet>
            {userData.isAdmin === true ?
                <>
                    <Navbar />
                    <div id='swipepage' className={darkmode ? "darkswipepage" : "lightswipepage"}>
                        <div className="adminleft">
                            <Nav />
                        </div>
                        <div className="adminright">
                            <div className='filter'>
                                <div className="search">
                                    <div className="form__group field">
                                        <input type="input" className="form__field" placeholder="Name" name="name" id='name' required onChange={(e) => { setSearch(e.target.value) }} />
                                        <label htmlFor="name" className="form__label">Name</label>
                                    </div>
                                </div>
                                <div className="sort">
                                    <button onClick={() => setSort({ property: "swipername", asc: true })}>A-z</button>
                                    <button onClick={() => setSort({ property: "swipername", asc: false })}>Z-a</button>
                                    <button onClick={() => setSort(null)}>Default</button>
                                </div>
                            </div>
                            <div className="datas">
                                <h3>Image</h3>
                                <h3>Nickname</h3>
                                <h3>Delete</h3>
                            </div>
                            {data && data
                                .filter((item) => item.swipername.toLowerCase().trim().includes(search.toLowerCase()))
                                .sort((a, b) => {
                                    if (sort && sort.asc === true) {
                                        return a[sort.property] > b[sort.property] ? 1 : b[sort.property] > a[sort.property] ? -1 : 0
                                    } else if (sort && sort.asc === false) {
                                        return a[sort.property] < b[sort.property] ? 1 : b[sort.property] < a[sort.property] ? -1 : 0
                                    }
                                    else {
                                        return 0
                                    }
                                })
                                .map((item) => (
                                    <div className='datas' key={item._id}>
                                        <p><img src={item.swiperimage} alt="" /></p>
                                        <p className='name'>{item.swipername}</p>
                                        <p><button className="button-67" role="button" onClick={() => deleteData(item._id)}>Delete</button></p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </>
                : <Errorpage />
            }
        </>
    );
};

export default SwipePage;
