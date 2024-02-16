import React, { useContext, useEffect, useState } from 'react';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import StarRating from '../../components/StarRating';
import { Link } from 'react-router-dom';
import './index.scss';

const MoviesPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const { darkmode } = useContext(DarkmodeContext);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:5500/api/movies/');
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredItems = data.filter((item) =>
        item.name.toLowerCase().trim().includes(search.toLowerCase())
    );
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div id='moviespage' className={darkmode ? 'darkmoviespage' : 'lightmoviespage'}>
            <Navbar />
            <div className='allmovies'>
                <div className='search'>
                    <div className='form__group field'>
                        <input
                            type='input'
                            className='form__field'
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                            value={search}
                            placeholder='Search'
                            name='name'
                            id='name'
                            required
                        />
                        <label htmlFor='name' className='form__label'>
                            Search
                        </label>
                    </div>
                    <div className='sort'>
                        <button>a-z</button>
                        <button>z-a</button>
                        <button onClick={() => handleSort('1-9imdb')}>1-9imdb</button>
                        <button onClick={() => handleSort('9-1imdb')}>9-1imdb</button>
                    </div>
                </div>
                <div className={`movies ${darkmode ? 'darkmovie' : 'lightmovie'}`}>
                    {currentItems &&
                        currentItems.map((item) => {
                            const averageRating = item.ratings
                                ? item.ratings.reduce((total, rating) => total + rating.rating, 0) / item.ratings.length
                                : 0;

                            return (
                                <Link to={`/detail/${item._id}`} key={item.id}>
                                    <ul>
                                        <li className='imgli'>
                                            <img src={item.image} alt='' />
                                        </li>
                                        <li>{item.name}</li>
                                        <li>Language: {item.lang}</li>
                                        <li>
                                            {item.ratings && item.ratings.length > 0 ? (
                                                <StarRating rating={averageRating} />
                                            ) : (
                                                <StarRating rating={averageRating} />
                                            )}
                                        </li>
                                    </ul>
                                </Link>
                            );
                        })}
                </div>
                <div className='pagination'>
                    {filteredItems.length > itemsPerPage && (
                        <ul>
                            {Array(Math.ceil(filteredItems.length / itemsPerPage))
                                .fill()
                                .map((_, index) => (
                                    <li key={index} onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MoviesPage;