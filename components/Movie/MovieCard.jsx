import React from "react";
import "./styles.css"

export default function MovieCard({ movie }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };
  
  return (
    <div key={movie.id} className="movie-card">
      <img src={movie.poster} alt={movie.title} onError={handleError}></img>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.titulo}</h3>
        <div>
          <span className="movie-card-genre">{movie.genero}</span>
          <span className={"movie-card-rating"}>
            {movie.notaIMDB}
          </span>
        </div>
      </div>
    </div>
  );
}
