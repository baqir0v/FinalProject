import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaVimeo } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { DarkmodeContext } from '../../Context/darkmodeContext';

const Footer = () => {
  const { darkmode } = useContext(DarkmodeContext)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5500/api/categories/")
      const jsonData = await res.json()
      setData(jsonData)
    }
    fetchData()
  }, [])

  return (
    <footer id='footer' className={darkmode ? "darkfooter" : "lightfooter"}>
      <div className="footerbox">
        <div className="footertop">
          <h3>Movies</h3>
          <div className="social">
            <a href=''><FaFacebookF /> Facebook</a>
            <a href=''><FaTwitter /> Twitter</a>
            <a href=''><FaGoogle /> Google</a>
            <a href=""><FaYoutube /> Youtube</a>
            <a href=""><FaVimeo /> Vimeo</a>
          </div>
        </div>
        <div className="footermid">
          <div className="left">
            <ul>
              <h4>Pages</h4>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/signup"}>Sign Up</Link></li>
              <li><Link to={"/login"}>Login</Link></li>
              <li><Link to={"/contact"}>Contact</Link></li>
            </ul>
          </div>
          <div className="mid">
            <ul>
              <h4>Movie Categories</h4>
              <ul className='midul'>
                {data && data
                  .sort((a, b) => a.categoryname.localeCompare(b.categoryname))
                  .map((item) => (
                    <li key={item._id}><Link>{item.categoryname}</Link></li>
                  ))}
              </ul>
            </ul>
          </div>
          <div className="right">
            <h4>About</h4>
            <p style={{ maxWidth: "200px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed error distinctio iusto aliquid minus reprehenderit perspiciatis dolore id ducimus cumque.</p>
          </div>
        </div>

      </div>
      <div className="footerbottom">
        <div className="bottombox">
          <p>Copyright © 2024 All Rights Reserved By Movies</p>
          <img draggable="false" src="https://themehut.co/wp/movflx/wp-content/uploads/2022/08/card_img.png" alt="" />
        </div>
      </div>
    </footer>
  )
}

export default Footer