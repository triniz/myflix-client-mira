import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Button, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './main-view.scss';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [viewMovies, setViewMovies] = useState("movies")
    // const [searchTerm, setSearchTerm] = useState("");
    const [favoriteMovie, setFavoriteMovie] = useState([]);
    // const [loggedIn, setLoggedIn] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };


    useEffect(() => {
        if (!token) return;


        fetch("https://myflix90.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const movies = data.map((movie) => {
                    return {
                        image: movie.ImagePath,
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        director: movie.Director,
                        genre: movie.Genre,
                    };
                });

                setMovies(movies);
            });
    }, [token]);

    //search
    useEffect(() => {
        setFilteredMovies(movies);
    }, [movies]);

    const handleSearchInput = (e) => {
        const searchWord = e.target.value.toLowerCase();
        let tempArray = movies.filter((m) =>
            m.title.toLowerCase().includes(searchWord)
        );
        setFilteredMovies(tempArray);
    };


    // user must login or signup
    return (
        <BrowserRouter>
            <NavigationBar className="justify-content-md-center"
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                    window.location.reload();
                }}
                handleSearchInput={handleSearchInput}

            //const filteredMovies = movies.filter((movie) =>
            //  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            //);

            />

            <Row className="justify-content-md-center mt-5">
                <Routes>

                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    < Col md={6}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }}
                                        />
                                    </Col>
                                )}
                            </>

                        }
                    />

                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            user={user}
                                            token={token}
                                            movies={movies}
                                            updateUser={updateUser}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/users"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                                    setUser(null);
                                    setToken(null);
                                    localStorage.clear();
                                }} updateUser={updateUser} />
                            )
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col> The list is empty!</Col>
                                ) : (
                                    <>
                                        {filteredMovies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};