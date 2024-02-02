import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/userContext'
import axios from 'axios'
import "./index.scss"

const AdminPage = () => {
  const [data, setData] = useState([])
  const { user, userData } = useContext(UserContext)

  const fetchData = async () => {
    const res = await fetch("http://localhost:5500/api/users/")
    const jsonData = await res.json()
    setData(jsonData)
  }

  const handleChangeAdmin = async(item) => {
    const resp = await axios.put(`http://localhost:5500/api/users/${item._id}`,
    item.isAdmin ? {isAdmin:false} : {isAdmin:true}
    )
    fetchData()
  }

  const handleDelete = async(_id)=>{
    const resp = await axios.delete(`http://localhost:5500/api/users/${_id}`) 
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      {data.length > 0 ?
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Nickname</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Change Admin</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((item) => (
              <tr key={item._id}>
                <td><img src={item.image.url} alt="" /></td>
                <td>{item.nickname}</td>
                <td>{item.email}</td>
                {item.isAdmin === true ? <td>True</td> : <td>False</td>}
                <td><button onClick={()=>handleChangeAdmin(item)}>Change</button></td>
                <td><button onClick={()=>handleDelete(item._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        : <h1>There is No Users</h1>
      }
    </div>
  )
}

export default AdminPage