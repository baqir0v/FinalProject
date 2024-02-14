import React, { useContext, useEffect, useState } from 'react'
import { DarkmodeContext } from '../../Context/darkmodeContext'
import "./index.scss"
import axios from 'axios'

const MoviesPage = () => {
    const [data, setData] = useState([])
    const { darkmode } = useContext(DarkmodeContext)

    const fetchData = async () => {
        const res = await fetch("http://localhost:5500/api/movies/")
        const jsonData = await res.json()
        setData(jsonData)
    }

    const handleDelete = async (_id)=>{
        try {
            const resp = await axios.delete(`http://localhost:5500/api/movies/${_id}`)
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div id='moviespage'>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item) => (
                        <tr key={item._id}>
                            <td><img src={item.image} alt="" /></td>
                            <td>{item.name}</td>
                            <td><button onClick={()=>handleDelete(item._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MoviesPage