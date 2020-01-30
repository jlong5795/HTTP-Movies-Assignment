import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();

    useEffect(() => {
    axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
            console.log(response.data);
            setMovie(response.data);
        })
        .catch(error => {
            console.log(error);
        })

    }, [props.movie, id]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
        value = parseInt(value, 10);
        }

        setMovie({
        ...movie,
        [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(response => {
                console.log('Update Put Request', response.data);
                props.history.push(`/movies/${movie.id}`);
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
                value={movie.title}
            />
             <input
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder='director'
                value={movie.director}
            />
             <input
                type='number'
                name='metascore'
                onChange={changeHandler}
                placeholder='metascore'
                value={movie.metascore}
            />
             <input
                type='text'
                name='stars'
                onChange={changeHandler}
                placeholder='stars'
                value={movie.stars}
            />
            <button>Update</button>
        </form>


    )
};
 
export default UpdateMovie;