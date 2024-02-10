import React, { useEffect, useState } from 'react'
import "./index.scss"

const Movies = () => {
    const [data, setData] = useState([])

    const fetchData = async ()=>{
        const res = await fetch("http://localhost:5500/api/movies/")
        const jsonData = await res.json()
        setData(jsonData)
    }

    useEffect(() => {
      fetchData()
    }, [])
    
  return (
    <section>
        {data && data.map((item)=>(
            <ul key={item._id}>
                <li>Name:{item.name}</li>
                <li>
              Category:
              {item.category.map((cat) => (
                <span key={cat._id}>{cat.categoryname}</span>
              ))}
            </li>
                <li><img style={{width:"100px"}} src={item.image} alt="" /></li>
                <li>Language:{item.lang}</li>
                <li>{item.cast.castName}</li>
            </ul>
        ))}
    </section>
  )
}

export default Movies