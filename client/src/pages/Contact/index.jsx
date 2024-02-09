import React, { useContext } from 'react'
import "./index.scss"
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import { FaVimeo } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { DarkmodeContext } from '../../Context/darkmodeContext';

const ContactPage = () => {
    const { darkmode } = useContext(DarkmodeContext)
    return (
        <div id='contact' className={darkmode ? "contactdark" : "contactlight"}>
            <div className="contactbox">
                <div className="contactleft">
                    <h3>Get In Touch</h3>
                    <input type="text" placeholder='Your Name' />
                    <input type="text" placeholder='Your Email' />
                    <input type="text" placeholder='Your Subject' />
                    <textarea placeholder='Your Message' cols="30" rows="10"></textarea>
                    <button>Submit</button>
                </div>
                <div className="contactright">
                    <div className="top">
                        <h3>Contact Us</h3>
                        <p>514 S. Magnolia St. Orlando FL 32806, United States</p>
                        <p>Phone: (251) 546-9442</p>
                        <p>Fax: (251) 546-9443</p>
                    </div>
                    <div className="bottom">
                        <a href='https://www.facebook.com' className="blue">
                            <FaFacebookF />
                        </a>
                        <a href='https://twitter.com' className="cyan">
                            <FaTwitter />
                        </a>
                        <a href='https://www.google.com' className="orange">
                            <FaGoogle />
                        </a>
                        <a href='https://www.instagram.com' className="grey">
                            <FaInstagram />
                        </a>
                        <a href='https://www.vk.com' className="grey">
                            <SlSocialVkontakte />
                        </a>
                        <a href='https://www.vimeo.com' className="vimeo">
                            <FaVimeo />
                        </a>
                        <a href='https://www.youtube.com' className="red">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage