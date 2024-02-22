import React, { useContext, useEffect, useState } from 'react'
import { DarkmodeContext } from '../../Context/darkmodeContext'
import "./index.scss"
import axios from 'axios'
import Navbar from '../../layout/Navbar'
import { Link, NavLink } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import Nav from '../../layout/Nav'
import { UserContext } from '../../Context/userContext'
import Errorpage from '../Error'


const MoviesPage = () => {
  const [data, setData] = useState([])
  const { darkmode } = useContext(DarkmodeContext)
  const [search, setSearch] = useState('');
  const { userData } = useContext(UserContext)
  const [sort, setSort] = useState(null)

  const fetchData = async () => {
    const res = await fetch("http://localhost:5500/api/movies/")
    const jsonData = await res.json()
    setData(jsonData)
  }

  const handleDelete = async (_id) => {
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
    <>
      {userData.isAdmin === true ? (
        <>
          <Navbar />
          <div id='adminpage' className={darkmode ? "darkadmin" : "lightadmin"}>
            <div className="adminleft">
              <Nav />
            </div>
            {data.length > 0 ? (
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
                      <input type="input" className="form__field" placeholder="Name" name="name" id='name' required onChange={(e) => { setSearch(e.target.value) }} />
                      <label htmlFor="name" className="form__label">Name</label>
                    </div>
                  </div>
                  <div className="sort">
                    <button onClick={()=>setSort({property:"name",asc:true})}>A-z</button>
                    <button onClick={()=>setSort({property:"name",asc:false})}>Z-a</button>
                    <button onClick={()=>setSort(null)}>Default</button>
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
                {data && data
                  .filter((item) => item.name.toLowerCase().trim().includes(search.toLowerCase()))
                  .sort((a, b) => {
                    if (sort && sort.asc === true) {
                      return a[sort.property] > b[sort.property] ? 1 : b[sort.property] > a[sort.property] ? -1 : 0
                    } else if (sort && sort.asc === false) {
                      return a[sort.property] < b[sort.property] ? 1 : b[sort.property] < a[sort.property] ? -1 : 0
                    }
                    else {
                      return 0
                    }
                  })
                  .map((item) => (
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
            ) : <h1>There is No Users</h1>}
          </div>
        </>
      ) : <Errorpage />}
    </>

  )
}

export default MoviesPage