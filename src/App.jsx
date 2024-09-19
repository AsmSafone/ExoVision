import React, { useState, useEffect } from 'react';
import data from './data.json';
import Exovision from './components/Exovision';
const ExoplanetList = () => {
    const [exoplanets, setExoplanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const fetchExoplanets = async () => {
        //     const ls = localStorage.getItem('exoplanets');
        //     if (ls) {
        //         setExoplanets(JSON.parse(ls));
        //         setLoading(false);
        //     } else {
        //         try {
        //             const response = await fetch(
        //                 // 'https://cors.safone.dev/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=SELECT+distinct+hostname,+pl_name,+pl_orbsmax,+st_teff,+sy_dist,+pl_rade,+x,+y,+z,+disc_year+FROM+ps+WHERE+ROWNUM+%3C%3D+100+ORDER+BY+hostname+ASC&format=json' // for development
        //                 // 'https://cors.safone.dev/https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=SELECT+distinct+hostname,+pl_name,+pl_orbsmax,+st_teff,+sy_dist,+pl_rade,+x,+y,+z,+disc_year+FROM+ps+WHERE+ROWNUM+%3C%3D+500+ORDER+BY+hostname+ASC&format=json' // for production
        //                 'data.json'
        //             );
        //             if (!response.ok) {
        //                 throw new Error('Failed to fetch data');
        //             }
        //             const jsonData = await response.json();
        //             // console.log(jsonData);
        //             localStorage.setItem('exoplanets', JSON.stringify(jsonData));
        //             setExoplanets(jsonData);
        //         } catch (error) {
        //             setError(error.message);
        //         } finally {
        //             setLoading(false);
        //         }
        //     }
        // };

        // fetchExoplanets();
        setExoplanets(data ? data.slice(0,500) : []);
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading exoplanets...</div>;
    }

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    return <Exovision data={exoplanets} />;
};

export default ExoplanetList;
