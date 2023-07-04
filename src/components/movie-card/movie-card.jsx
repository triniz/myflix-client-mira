
import React from "react";
import PropTypes from "prop-types";// Here you import the PropTypes library
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';
import { FavoriteBtn } from "../favorite-btn/favorite-btn";


export const MovieCard = ({ movie },{updateUser}) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="mt-auto">
                    <Button className="button-primary">See more</Button>
                </Link>
                <h6>{movie.id}</h6>
                <FavoriteBtn movieId={movie.id} />
            </Card.Body>
        </Card>
    );
};

// Define the prop types this component should have
MovieCard.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string.isRequired
    }).isRequired
};