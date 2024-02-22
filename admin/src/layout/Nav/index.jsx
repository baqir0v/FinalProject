import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./index.scss"
import { FaUser } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { SiSwiper } from "react-icons/si";
import { IoIosAdd } from "react-icons/io";
import { PiHandSwipeRightFill } from "react-icons/pi";

const Nav = () => {
    return (
        <nav id='adminnav'>
            <NavLink activeclassname="active" to={"/admin"}><FaUser />Users</NavLink>
            <NavLink to={"/movies"}><MdLocalMovies />Movie</NavLink>
            <NavLink to={"/swipepage"}><SiSwiper />Swipe Page</NavLink>
            <NavLink to={"/add"}><IoIosAdd />Add</NavLink>
            <NavLink to={"/swiper"}><PiHandSwipeRightFill />Swiper</NavLink>
        </nav>

    )
}

export default Nav