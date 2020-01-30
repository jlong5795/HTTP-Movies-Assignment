import React, { useState } from 'react';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const AddMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    
    const changeHandler = (e) => {
        setMovie({
        ...movie,
        [e.target.name]: e.target.value
        })
    }

    const starsArrayHandler = (e) => {
        setMovie({
        ...movie,
        [e.target.name]: e.target.value.split(',')
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        console.log(movie);

        axios
            .post(`http://localhost:5000/api/movies/`, movie)
            .then(response => {
                console.log('Add Put Request', response.data);
                props.history.push(`/`);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                onChange={changeHandler}
                placeholder='title'
            />
             <input
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder='director'
            />
             <input
                type='number'
                name='metascore'
                onChange={changeHandler}
                placeholder='metascore'
            />
             <input
                type='text'
                name='stars'
                onChange={starsArrayHandler}
                placeholder='stars'
            />
            <button>Add</button>
        </form>


    )
};

export default AddMovie;