import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import { Link, NavLink } from 'react-router-dom';
import "./index.scss";

const SwipePage = () => {
    const { darkmode } = useContext(DarkmodeContext);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:5500/api/swiper/");
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching swiper data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div id='swipepage' className={darkmode ? "darkswipepage" : "lightswipepage"}>
                <div className="adminleft">
                    <NavLink activeClassName="active" to={"/admin"}>Users</NavLink>
                    <NavLink to={"/movies"}>Movie</NavLink>
                    <NavLink to={"/add"}>Add</NavLink>
                </div>
                <div className="adminright">
                    <div className='filter'>
                        <div className="search">
                            <div className="form__group field">
                                <input type="input" className="form__field" placeholder="Name" name="name" id='name' required />
                                <label htmlFor="name" className="form__label">Name</label>
                            </div>
                        </div>
                        <div className="sort">
                            <button>a</button>
                            <button>z</button>
                            filter
                        </div>
                    </div>
                    <div className="datas">
                        <h3>Image</h3>
                        <h3>Nickname</h3>
                        {/* <h3>Email</h3>
                        <h3>Admin</h3>
                        <h3>Change Role</h3> */}
                        <h3>Delete</h3>
                    </div>
                    {data && data.map((item) => (
                        <div className='datas' key={item._id}>
                            <p><img src={item.swiperimage} alt="" /></p>
                            <p>{item.swipername}</p>
                            <p><button className="button-67" role="button" onClick={() => handleDelete(item._id)}>Delete</button></p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SwipePage;
