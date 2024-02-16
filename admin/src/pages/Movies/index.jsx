import React, { useContext, useEffect, useState } from 'react'
import { DarkmodeContext } from '../../Context/darkmodeContext'
import "./index.scss"
import axios from 'axios'
import Navbar from '../../layout/Navbar'
import { Link, NavLink } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"


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

    // {data && data.map((item) => (
    //     <tr key={item._id}>
    //         <td><img src={item.image} alt="" /></td>
    //         <td>{item.name}</td>
    //         <td><button onClick={()=>handleDelete(item._id)}>Delete</button></td>
    //     </tr>
    // ))}

    return (
        <>
        <Navbar />
        <div id='adminpage' className={darkmode ? "darkadmin" : "lightadmin"}>
          <div className="adminleft">
            <NavLink activeclassname="active" to={"/admin"}>Users</NavLink>
            <NavLink to={"/movies"}>Movie</NavLink>
            <NavLink to={"/add"}>Add</NavLink>
          </div>
          {data.length > 0 ?
            <div className='adminright'>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <div className='filter'>
                <div className="search">
                  <div className="form__group field">
                    <input type="input" className="form__field" placeholder="Name" name="name" id='name' required />
                    <label htmlFor="name" className="form__label">Name</label>
                  </div>
                </div>
                <div className="sort">
                  <button>a</button>
                  <button>z</button>
                  filter
                </div>
              </div>
              <div className="datas">
                <h3>Image</h3>
                <h3>Name</h3>
                <h3>Year</h3>
                <h3>Lang</h3>
                <h3>IMDB</h3>
                <h3>Delete</h3>
              </div>
              {data && data.map((item) => (
                <div className='datas' key={item._id}>
                  <p><img src={item.image} alt="" /></p>
                  <p>{item.name}</p>
                  <p>{item.year}</p>
                  <p>{item.lang}</p>
                  <p>{item.imdb}</p>
                  <p><button className="button-67" role="button" onClick={() => handleDelete(item._id)}>Delete</button></p>
                </div>
              ))}
            </div>
            : <h1>There is No Users</h1>
          }
        </div>
      </>
    )
}

export default MoviesPage