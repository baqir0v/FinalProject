import React, { useContext } from 'react'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'
import './index.scss'
import { DarkmodeContext } from '../../Context/darkmodeContext'
import {Helmet} from "react-helmet-async"

const AboutPage = () => {
    const { darkmode } = useContext(DarkmodeContext)

    return (
        <div id='aboutpage' className={darkmode ? "darkabout" : "lightabout"}>
            <Helmet>
                <title>
                    About
                </title>
            </Helmet>
            <Navbar />
            <div className="abouts">
                <h1 style={{ textAlign: "center" }}>About</h1>
                <div className="about">
                    <div className="aboutcard">
                        <img src="https://themehut.co/wp/movflx/wp-content/uploads/2022/08/blog_thumb02.jpg" alt="" />
                        <span>August 8, 2022</span>
                        <h2>
                            Where watch English movies free?
                        </h2>
                        <p>
                            "Normal text is simply readable content of the writing and typing industry. Regular text has been the industry’s common written content ever since the 1500s when an unknown writer produced a document of type and rearranged it to create a sample book. It has endured not only for five centuries but also the transition into modern times."
                        </p>
                    </div>
                </div>
                <div className="about2 about">
                    <div className="aboutcard aboutcard2">
                        <img src="https://themehut.co/wp/movflx/wp-content/uploads/2022/08/blog_thumb01.jpg" alt="" />
                        <span>August 8, 2022</span>
                        <h2>
                            Your Free Movie Streaming Purposes
                        </h2>
                        <p>
                            "Normal text is simply readable content of the writing and typing industry. Regular text has been the industry’s common written content ever since the 1500s when an unknown writer produced a document of type and rearranged it to create a sample book. It has endured not only for five centuries but also the transition into modern times."
                        </p>
                    </div>
                </div>
                <div className="about">
                    <div className="aboutcard">
                        <img src="https://themehut.co/wp/movflx/wp-content/uploads/2022/08/blog_thumb06.jpg" alt="" />
                        <span>August 8, 2022</span>
                        <h2>
                            Automatically transcribe movie video
                        </h2>
                        <p>
                            "Normal text is simply readable content of the writing and typing industry. Regular text has been the industry’s common written content ever since the 1500s when an unknown writer produced a document of type and rearranged it to create a sample book. It has endured not only for five centuries but also the transition into modern times."
                        </p>
                    </div>
                </div>
                <div className="about2 about">
                    <div className="aboutcard aboutcard2">
                        <img src="https://themehut.co/wp/movflx/wp-content/uploads/2022/08/blog_thumb05.jpg" alt="" />
                        <span>August 8, 2022</span>
                        <h2>
                            Record streaming movies online for offline playback
                        </h2>
                        <p>
                            "Normal text is simply readable content of the writing and typing industry. Regular text has been the industry’s common written content ever since the 1500s when an unknown writer produced a document of type and rearranged it to create a sample book. It has endured not only for five centuries but also the transition into modern times."
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutPage