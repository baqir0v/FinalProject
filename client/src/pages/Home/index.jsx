import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../layout/Navbar';
import Footer from '../../layout/Footer/index';
import "./index.scss"
import { DarkmodeContext } from '../../Context/darkmodeContext';
import Action from '../../components/Action';
import Crime from '../../components/Crime';
import Drama from '../../components/Drama';
import Comedy from '../../components/Comedy';
import SciFi from '../../components/Sci-Fi';
import Thriller from '../../components/Thriller';
import Sports from '../../components/Sports';
import Western from '../../components/Western';
import Documentary from '../../components/Documentary';
import Horror from '../../components/Horror';
import Romance from '../../components/Romance';
import Animation from '../../components/Animation';
import Favorites from '../../components/Favorite';

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
        }, 1340);

        return () => {
            showScrollbar();
        }
    }, []);

    return (
        <div id='home' className={darkmode ? "darkhome" : "lighthome"}>

            {isLoading ? (
                <div className='loading'>
                    <span className="loader"></span>
                </div>
            ) : (
                <>
                </>
            )}
            <Navbar />
            <Animation />
            {/* <Action/> */}
            <Favorites/>
            {/* <Crime/> */}
            {/* <Drama/> */}
            {/* <Comedy/> */}
            {/* <SciFi/> */}
            <Thriller/>
            {/* <Sports/>
            <Western/>
            <Documentary/>
            <Horror/>
            <Romance/> */}
            <Footer />
        </div>
    );
};

export default Home;
