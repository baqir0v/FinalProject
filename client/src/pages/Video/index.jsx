import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ErrorPage from '../Error'
import { UserContext } from '../../Context/userContext'
import { Helmet } from "react-helmet-async"

const Video = () => {
    const [details, setDetails] = useState([])
    const { id } = useParams()
    const { darkmode } = useContext(DarkmodeContext);
    const { user, userData } = useContext(UserContext);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const resp = await fetch(`http://localhost:5500/api/movies/${id}`)
            const jsonData = await resp.json()
            setDetails(jsonData)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <Helmet>
                <title>
                    Movie
                </title>
            </Helmet>
            {user ?
                <>
                    <div id='video' className={darkmode ? "darkvideo" : "lightvideo"}>
                        {details ?
                            <>
                                <Navbar />
                                <div className='video'>
                                    <div className="movie">
                                        <h1>{details.name}</h1>
                                        {details.video ? (
                                            <ReactPlayer
                                                className="player"
                                                width={"750px"}
                                                height={"450px"}
                                                url={details.video}
                                                controls={true}
                                                playIcon={true}
                                            />
                                        ) : (
                                            <div className='videoskeleton'>
                                                <span class="loader"></span>
                                            </div>
                                        )}
                                    </div>
                                    <button class="button-29" role="button" onClick={() => navigate(-1)}>Go back</button>
                                </div>
                                <Footer />
                            </>
                            : ""}
                    </div>
                </>
                : <ErrorPage />}
        </>
    )
}

export default Video