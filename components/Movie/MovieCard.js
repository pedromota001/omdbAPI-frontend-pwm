import React from "react";
import "../styles.css";

export default function MovieCard({ movie }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  //funcao para definir a cor do 'rating' baseado no css
  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";
    if (rating >= 5 && rating < 8) return "rating-ok";
    return "rating-bad";
  };

  return (
    <div key={movie.id} className="movie-card">
      <img src={movie.poster} alt={movie.title} onError={handleError}></img>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
