import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import "./index.scss"
import Navbar from '../../layout/Navbar'
import { Link, NavLink } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { DarkmodeContext } from '../../Context/darkmodeContext'
import { UserContext } from '../../Context/userContext'
import Errorpage from '../Error'
import Nav from '../../layout/Nav'
import {Helmet} from "react-helmet-async"

const AdminPage = () => {
  const [data, setData] = useState([])
  const { darkmode } = useContext(DarkmodeContext)
  const { userData } = useContext(UserContext)
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(null)

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
      {userData.isAdmin === true
        ?
        <>
          <Navbar />
          <div id='adminpage' className={darkmode ? "darkadmin" : "lightadmin"}>
            <div className="adminleft">
              <Nav />
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
                      <input type="input" className="form__field" placeholder="Name" name="name" id='name' required onChange={(e) => { setSearch(e.target.value) }} />
                      <label htmlFor="name" className="form__label">Name</label>
                    </div>
                  </div>
                  <div className="sort">
                    <button onClick={() => setSort({ property: "nickname", asc: true })}>A-z</button>
                    <button onClick={() => setSort({ property: "nickname", asc: false })}>Z-a</button>
                    <button onClick={() => setSort(null)}>Default</button>
                  </div>
                </div>
                <div className="datas">
                  <h3>Image</h3>
                  <h3>Nickname</h3>
                  <h3>Email</h3>
                  <h3>Role</h3>
                  <h3>Change Role</h3>
                  <h3>Delete</h3>
                </div>
                {data && data
                  .filter((item) => item.nickname.toLowerCase().trim().includes(search.toLowerCase()))
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
                      <p>{item.nickname}</p>
                      <p className='email'>{item.email}</p>
                      <p>{item.isAdmin === true ? "Admin" : "User"}</p>
                      <p><button className="button-66" role="button" onClick={() => handleChangeAdmin(item)}>Change</button></p>
                      <p><button className="button-67" role="button" onClick={() => handleDelete(item._id)}>Delete</button></p>
                    </div>
                  ))}
              </div>
              : <h1>There is No Users</h1>
            }
          </div>
        </>
        : <Errorpage />}
    </>
  )
}

export default AdminPage