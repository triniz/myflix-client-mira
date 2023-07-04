import React, { useState, useEffect } from "react";
import { Card, Col, Form, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.id));
 

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        fetch(`https://myflix90.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Changing userdata failed");
                    return false;
                }
            })
            .then(user => {
                if (user) {
                    alert("Successfully changed userdata");
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });
    }

    const deleteAccount = () => {
        console.log("Account deleted")
        fetch(`https://myflix90.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    alert("Your account has successfully been deleted. Good Bye!");
                    onLoggedOut();
                } else {
                    alert("Account could not be deleted");
                }
            })
            .catch(e => {
                alert(e);
            });
    }



    return (
        <>
            <Col md={6}>
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title >Your Profile Info</Card.Title>
                        <p>Username: {user.Username}</p>
                        <p>Email: {user.Email}</p>
                        <p>Birthday: {user.Birthday.slice(0, 10)}</p>
                        <Button className="button-primary" onClick={() => {
                            if (confirm("Are you sure?")) {
                                deleteAccount();
                            }
                        }}>Delete Account</Button>
                    </Card.Body>
                </Card>

            </Col>
            <Col md={6}>
                <Card className="mt-2 mb-5">
                    <Card.Body>
                        <Card.Title>Update your info</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    minLength="5"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength="8"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthday}
                                    onChange={e => setBirthday(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Button className="button-primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12}>
                <Card>
                    <h3 className="mt-3 mb-3 ps-3">Your favorite movies</h3>
                </Card>
            </Col>
            {favoriteMovies.map(movie => (
                <Col className="mb-4 mt-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                    <MovieCard movie={movie} />
                </Col >
            ))}
        </>
    );
}