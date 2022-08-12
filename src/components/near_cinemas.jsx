import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NearCinemas = () => {
    if (!navigator.geolocation) {
        console.error(`Your browser doesn't support Geolocation`);
    }
    const [cinemas, setCinemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const getPosition = () => {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             setLat(position.coords.latitude);
    //             setLng(position.coords.longitude);
    //             console.log(position.coords.latitude);
    //             console.log(position.coords.longitude);
    //             setLoading(false);
    //         }
    //     );
    // }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(getCinemas);
    }, []);

    const getCinemas = async (pos) => {
        const body = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        };

        const response = await fetch(`http://localhost:3000/allCinemas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        setCinemas(data);
        console.log(data);
        setLoading(false);
    }
    
    

    return (
        <div>
            <h1>Cines mas cercanos</h1>
            {loading ? 
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> 
            :   
            <ul>
                {cinemas.map((cinema) => (
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">{`${cinema.owner}: ${cinema.name} (${cinema.distance} Km)`}</h5>
                            <p class="card-text">{cinema.address}</p>
                            <Link to={`/cinema/${cinema.owner}/${cinema.internal_id}/${cinema.name}`} class="btn btn-primary">Cartelera</Link>
        
                        </div>
                    </div>
                    // <li key={cinema.id}>
                    // <Link to={`/cinema/${cinema.owner}/${cinema.internal_id}/${cinema.name}`}>{cinema.owner}: {cinema.name} {cinema.distance}</Link>
                    // </li>
                ))}
            </ul>   
            }
        </div>
    );
}

export default NearCinemas;