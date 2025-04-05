import React from "react";
//import de styles.css que vai ser implementada

export default function MovieCard({ movie }) {
  return (
    <div key={movie.id} className="movie-card">
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
