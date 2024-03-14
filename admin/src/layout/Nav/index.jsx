import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./index.scss"
import { FaUser } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { SiSwiper } from "react-icons/si";
import { IoIosAdd } from "react-icons/io";
import { PiHandSwipeRightFill } from "react-icons/pi";
import { DarkmodeContext } from '../../Context/darkmodeContext';

const Nav = () => {
    const { darkmode } = useContext(DarkmodeContext)
    return (
        <nav id='adminnav' className={darkmode ? "darknavbar" : "lightnavbar"}>
            <NavLink activeclassname="active" to={"/admin"}><FaUser />Users</NavLink>
            <NavLink className="navmovies" to={"/movies"}><MdLocalMovies />Movies</NavLink>
            <NavLink to={"/swipepage"}><SiSwiper />Swipe Page</NavLink>
            <NavLink to={"/add"}><IoIosAdd />Add</NavLink>
            <NavLink to={"/swiper"}><PiHandSwipeRightFill />Swiper</NavLink>
        </nav>

    )
}

export default Nav