import React, { useContext, useState } from 'react'
import "./index.scss"
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import { FaVimeo } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { DarkmodeContext } from '../../Context/darkmodeContext';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import emailjs from '@emailjs/browser';
import { UserContext } from '../../Context/userContext';
import ErrorPage from '../Error';
import { Helmet } from "react-helmet-async"

const ContactPage = () => {
    const { darkmode } = useContext(DarkmodeContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const { user, userData } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault()

        const serviceId = "service_b7hafz4"
        const templateId = "template_1pq5rdh"
        const publicKey = "vyT9G6jrhk8UGfEQW"

        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: "Ahmad",
            message: message

        }

        emailjs.send(serviceId, templateId, templateParams, publicKey).then((response) => {
            console.log("Email Send Success", response);
            setEmail('')
            setMessage('')
            setMessage('')
        })
            .catch((error) => {
                console.error("Error send email:", error)
            })

    }

    return (
        <>
            <Helmet>
                <title>
                    Contact
                </title>
            </Helmet>
            {user ?
                <>
                    <Navbar />
                    <div id='contact' className={darkmode ? "contactdark" : "contactlight"}>
                        <div className="contactbox">
                            <div className="contactleft">
                                <form action="" onSubmit={handleSubmit}>
                                    <h3>Get In Touch</h3>
                                    <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                                    <input type="text" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <textarea placeholder='Your Message' cols="30" rows="10" type="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                    <button>Submit</button>
                                </form>
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
                    <Footer />
                </>
                : <ErrorPage />}
        </>
    )
}

export default ContactPage