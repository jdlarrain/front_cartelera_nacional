import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Cinema = () => {
    const { owner, internal_id, cinema_name} = useParams();
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);

    const getMovies = async () => {
    const response = await fetch(`http://localhost:3000/moviesByCinema?owner=${owner}&internal_id=${internal_id}`);
        const data = await response.json();
        setMovies(data);
        setLoading(false);
    }

    useEffect(() => {
        getMovies();
    } , [owner, internal_id]);

    return (
        <div>
            <h1>Pelícluas en {cinema_name}: </h1>
            {loading ? <p>Cargando...</p> :
            <div>
                {movies.map((movie) => (
                    <div class="card" style={{width: '18em'}}>
                        <img src={movie.poster} alt={movie.title} />
                        <div class="card-body">
                            <h5 class="card-title">{movie.title}</h5>
                            <p>{movie.synopsis}</p>
                            <a href="#" class="btn btn-primary">Ver</a>
                            {/* {movie.trailer ? 
                                <iframe width="420" height="315"
                                    src={`https://www.youtube.com/embed/${movie.trailer}`}>
                                </iframe>
                            : null } */}
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    );
}

export default Cinema;