import React, { useContext } from 'react'
import { DarkmodeContext } from '../../Context/darkmodeContext'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async"

const ErrorPage = () => {
  const { darkmode } = useContext(DarkmodeContext)
  const navigate = useNavigate();
  return (
    <div id='errorpage' className={darkmode ? "darkerror" : "lighterror"}>
      <Helmet>
        <title>
          Error
        </title>
      </Helmet>
      <div className="errors">
        <h1>404</h1>
        <h3>Page Not Found</h3>
        <a onClick={() => navigate(-1)}><FaArrowLeft />Go Back</a>
      </div>
    </div>
  )
}

export default ErrorPage