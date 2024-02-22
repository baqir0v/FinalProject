import React, { useContext, useEffect, useState } from 'react';
import { DarkmodeContext } from '../../Context/darkmodeContext';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer';
import StarRating from '../../components/StarRating';
import { Link } from 'react-router-dom';
import './index.scss';
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { Slider } from "antd"

const MoviesPage = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const { darkmode } = useContext(DarkmodeContext);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(null)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [imdbRange, setImdbRange] = useState([0, 10]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [catData, setCatData] = useState([])

    const openFilter = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:5500/api/movies/');
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('http://localhost:5500/api/categories/');
            const jsonData = await res.json();
            setCatData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCategories()
    }, []);


    const handleRatingFilter = (rating) => {
        if (selectedRatings.includes(rating)) {
            setSelectedRatings(selectedRatings.filter((selected) => selected !== rating));
        } else {
            setSelectedRatings([...selectedRatings, rating]);
        }
    };

    const filterByRating = (movie) => {
        const averageRating = movie.ratings
            ? movie.ratings.reduce((total, rating) => total + rating.rating, 0) / movie.ratings.length
            : 0;

        const imdbInRange = imdbRange[0] <= movie.imdb && movie.imdb <= imdbRange[1];

        return (
            (selectedRatings.length === 0 || selectedRatings.includes(Math.round(averageRating))) &&
            imdbInRange
        );
    };

    const handleCategoryFilter = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((selected) => selected !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const filterByCategory = (movie) => {
        return (
            selectedCategories.length === 0 ||
            movie.category.some((cat) => selectedCategories.includes(cat.categoryname))
        );
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredItems = data.filter((item) =>
        item.name.toLowerCase().trim().includes(search.toLowerCase())
    );
    const currentItems = filteredItems
        .filter(filterByCategory)
        .filter(filterByRating)
        .slice(indexOfFirstItem, indexOfLastItem);


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
                        <button onClick={() => setSort({ property: "name", asc: true })}>A-Z</button>
                        <button onClick={() => setSort({ property: "name", asc: false })}>Z-A</button>
                        <button onClick={() => setSort(null)}>Default</button>
                        <button onClick={() => setSort('1-9imdb')}>IMDb <FaArrowUp /></button>
                        <button onClick={() => setSort('9-1imdb')}>IMDb <FaArrowDown /></button>
                    </div>
                    <div className="filter">
                        <button onClick={openFilter}>Filter <FaFilter /></button>
                    </div>
                </div>
                <div className={isFilterOpen ? "filtered" : "displaynone"}>
                    <div className="left">
                        <div className='byrating'>
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <span key={rating}>
                                    <label htmlFor={`rating-${rating}`}>
                                        <StarRating rating={rating} />
                                    </label>
                                    <input
                                        type='checkbox'
                                        name={`rating-${rating}`}
                                        id={`rating-${rating}`}
                                        checked={selectedRatings.includes(rating)}
                                        onChange={() => handleRatingFilter(rating)}
                                    />
                                </span>
                            ))}
                        </div>
                        <div className="byimdb">
                            <h3>IMDb</h3>
                            <Slider
                                range
                                max={10}
                                value={imdbRange}
                                onChange={(value) => setImdbRange(value)}
                            />

                        </div>
                    </div>
                    <div className="bycategory">
                        {catData.map((category) => (
                            <span className="checkbox-wrapper-29" key={category._id}>
                                {category.categoryname}
                                <label className="checkbox" htmlFor={`category-${category.categoryname}`}>
                                    <input
                                        className="checkbox__input"
                                        type='checkbox'
                                        name={`category-${category.categoryname}`}
                                        id={`category-${category.categoryname}`}
                                        checked={selectedCategories.includes(category.categoryname)}
                                        onChange={() => handleCategoryFilter(category.categoryname)}
                                    />
                                    <span className="checkbox__label"></span>

                                </label>
                            </span>
                        ))}
                    </div>
                </div>
                <div className={`movies ${darkmode ? 'darkmovie' : 'lightmovie'}`}>
                    {currentItems &&
                        currentItems
                            .filter(filterByCategory)
                            .sort((a, b) => {
                                if (sort && sort.asc === true) {
                                    return a[sort.property] > b[sort.property] ? 1 : b[sort.property] > a[sort.property] ? -1 : 0;
                                } else if (sort && sort.asc === false) {
                                    return a[sort.property] < b[sort.property] ? 1 : b[sort.property] < a[sort.property] ? -1 : 0;
                                } else if (sort === '1-9imdb') {
                                    return a.imdb > b.imdb ? 1 : b.imdb > a.imdb ? -1 : 0;
                                } else if (sort === '9-1imdb') {
                                    return a.imdb < b.imdb ? 1 : b.imdb < a.imdb ? -1 : 0;
                                } else {
                                    return 0;
                                }
                            })
                            .map((item) => {
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