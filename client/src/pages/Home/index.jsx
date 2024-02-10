import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Movies from '../../components/Movies'

const Home = () => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const res = await fetch("http://localhost:5500/api/users/")
        const jsonData = await res.json()
        setData(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
           <Movies/>
        </div>
    )
}

export default Home