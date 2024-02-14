import React, { useContext, useEffect, useState } from 'react';
import Movies from '../../components/Movies';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer/index';
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext';

const Home = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { darkmode } = useContext(DarkmodeContext);

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:5500/api/users/');
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const loadingTimeout = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(loadingTimeout);
        }
    }, [data]);

    useEffect(() => {
        const hideScrollbar = () => {
            document.body.classList.add('hide-scrollbar');
        };

        const showScrollbar = () => {
            document.body.classList.remove('hide-scrollbar');
        };

        hideScrollbar();

        setTimeout(() => {
            showScrollbar();
        }, 1300);

        return () => {
            showScrollbar();
        }
    }, []);

    return (
        <div id='home' className={darkmode ? "darkhome" : "lighthome"}>

            {isLoading ? (
                <div className='loading'>
                    <span class="loader"></span>
                </div>
            ) : (
                <>
                </>
            )}
            <Navbar />
            <Movies />
            <Footer />
        </div>
    );
};

export default Home;
