import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext'
import axios from 'axios'
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/Footer'
import { Link, NavLink } from 'react-router-dom'
import { Toaster, useToaster } from 'react-hot-toast';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {Helmet} from "react-helmet-async"

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
    try {
      const resp = await axios.put(`http://localhost:5500/api/users/${item._id}`,
        item.isAdmin ? { isAdmin: false } : { isAdmin: true }
      )
      fetchData()
      toast.success('Admin role changed successfully');
    } catch (error) {
      console.error('Error changing admin role:', error);
      toast.error('Error changing admin role');
    }

  }

  const handleDelete = async (_id) => {
    try {
      const resp = await axios.delete(`http://localhost:5500/api/users/${_id}`)
      fetchData()
      toast.success('User deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error("User couldn't delete");
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Helmet>
        <title>
          Admin
        </title>
      </Helmet>
      <Navbar />
      <div id='adminpage' className={darkmode ? "darkadmin" : "lightadmin"}>
        <div className="adminleft">
          <NavLink activeclassname="active" to={"/admin"}>Users</NavLink>
          <NavLink to={"/movies"}>Movie</NavLink>
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
              <h3>Nickname</h3>
              <h3>Email</h3>
              <h3>Admin</h3>
              <h3>Change Role</h3>
              <h3>Delete</h3>
            </div>
            {data && data.map((item) => (
              <div className='datas' key={item._id}>
                <p><img src={item.image} alt="" /></p>
                <p>{item.nickname}</p>
                <p>{item.email}</p>
                <p>{item.isAdmin === true ? "True" : "False"}</p>
                <p><button className="button-66" role="button" onClick={() => handleChangeAdmin(item)}>Change</button></p>
                <p><button className="button-67" role="button" onClick={() => handleDelete(item._id)}>Delete</button></p>
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