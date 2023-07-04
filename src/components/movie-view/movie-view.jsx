import PropTypes from 'prop-types';
import { Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import { useEffect, useState } from 'react';
import './movie-view.scss';


export const MovieView = ({ movies, user, token, updateUser }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    //const similarMovies = movies.filter(movie => movie.genre === movie.genre ? true : false)
    const [isFavorite, setIsFavorite] = useState(user.FavoriteMovies.includes(movie.id));

    useEffect(() => {
        setIsFavorite(user.FavoriteMovies.includes(movie.id));
        window.scrollTo(0, 0);
    }, [movieId])

    const addFavorite = () => {
        fetch(`https://myflix90.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed");
                    return false;
                }
            })
            .then(user => {
                if (user) {
                    alert("Successfully added to favorites");
                    setIsFavorite(true);
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });
    }

    const removeFavorite = () => {
        fetch(`https://myflix90.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed");
                    return false;
                }
            })
            .then(user => {
                if (user) {
                    alert("Successfully deleted from favorites");
                    setIsFavorite(false);
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });
    }


    return (
        <div className='blackborder' >
            <div>
                <img src={movie.image} className="img-fluid" />
            </div>
            <div className='margin'>
                <span className="bold">Title: </span>
                <span>{movie.title}</span>
            </div>
            <div className='margin'>
                <span className="bold">Description: </span>
                <span>{movie.description}</span>
            </div>
            <div className='margin'>
                <span className="bold">Genre: </span>
                <span>{movie.genre.Name}</span>
            </div>
            <div className='margin'>
                <span className="bold">Director: </span>
                <span>{movie.director.Name}</span>
            </div>
            <Link to={`/`}>
                <button className="button-primary" style={{ cursor: "pointer" }}> Back </button>

            </Link>
            {isFavorite ?
                <Button className="button-primary" onClick={removeFavorite}>Remove from favorites</Button>
                : <Button className="button-primary" onClick={addFavorite}>Add to favorites</Button>
            }
        </div >
    );
};

