import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext'
import axios from 'axios'
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'
import { Link } from 'react-router-dom'

const AdminPage = () => {
  const [data, setData] = useState([])
  const { user, userData } = useContext(UserContext)
  const { darkmode } = useContext(DarkmodeContext)

  const fetchData = async () => {
    const res = await fetch("http://localhost:5500/api/users/")
    const jsonData = await res.json()
    setData(jsonData)
  }

  const handleChangeAdmin = async (item) => {
    const resp = await axios.put(`http://localhost:5500/api/users/${item._id}`,
      item.isAdmin ? { isAdmin: false } : { isAdmin: true }
    )
    fetchData()
  }

  const handleDelete = async (_id) => {
    const resp = await axios.delete(`http://localhost:5500/api/users/${_id}`)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Navbar />
      <div id='adminpage' className={darkmode ? "darkadmin" : "lightadmin"}>
        <div className="adminleft">
          <Link to={"/admin"}>Users</Link>
          <Link to={"/movies"}>Movie</Link>
        </div>
        {data.length > 0 ?
          <div className='adminright'>
            <div className='filter'>
              <div className="search">
                <div class="form__group field">
                  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                  <label for="name" class="form__label">Name</label>
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
              <h3>Nickname</h3>
              <h3>Email</h3>
              <h3>Admin</h3>
              <h3>Chande Role</h3>
              <h3>Delete</h3>
            </div>
            {data && data.map((item) => (
              <div className='datas' key={item._id}>
                <p><img src={item.image} alt="" /></p>
                <p>{item.nickname}</p>
                <p>{item.email}</p>
                <p>{item.isAdmin === true ? "True" : "False"}</p>
                <p><button onClick={() => handleChangeAdmin(item)}>Change</button></p>
                <p><button onClick={() => handleDelete(item._id)}>Delete</button></p>
              </div>
            ))}
          </div>
          : <h1>There is No Users</h1>
        }
      </div>
      <Footer />
    </>
  )
}

export default AdminPage