import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export const FavoriteBtn = ({ movieId }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [isFavorite, setIsFavorite] = useState(false);
  
    useEffect(() => {
        setIsFavorite(user.FavoriteMovies.includes(movieId));
      }, [movieId]);
  
      const FavoriteBtnClicked = () => {
        const APIUrl= "https://myflix90.herokuapp.com";
            
        const methodType = isFavorite ? "DELETE" : "POST";
      
        fetch(`${APIUrl}/users/${user.Username}/movies/${movieId}`, {
          method: methodType,
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.text())
          .then((data) => {
            localStorage.setItem("user", data);
            setIsFavorite(!isFavorite);  // toggle the favorite state
          })
          .catch((error) => console.error(error));
      };
    
  
    return (
      <Button className="button-primary" onClick={() => FavoriteBtnClicked()}>
        {!isFavorite && "Add to favorites"}
        {isFavorite && "Remove from favorites"}
      </Button>
    );
  };