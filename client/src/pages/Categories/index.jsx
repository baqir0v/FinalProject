import React, { useContext, useEffect, useState } from 'react';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import { Link, useParams } from 'react-router-dom';
import './index.scss';


const CategoriesPage = () => {
    const [data, setData] = useState([]);
    const { darkmode } = useContext(DarkmodeContext);
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:5500/api/categories/${id}`);
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <div id='categories' className={darkmode ? 'darkmoviespage' : 'lightmoviespage'}>
            <Navbar />
            <div className='allmovies'>
                {data && data.movies ? (
                    <div className='cats'>
                        {data.movies.map((movie) => (
                            <Link to={`/detail/${movie._id}`}>
                                <ul key={movie._id}>
                                    <li><span>{movie.name}</span></li>
                                    <li><img src={movie.image} alt="" /></li>
                                </ul>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CategoriesPage;