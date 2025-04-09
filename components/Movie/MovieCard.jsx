import React from "react";
import Link from "next/link";
import "./styles.css";

export default function MovieCard({ movie }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingClass = (notaIMDB) => {
    if (notaIMDB >= 8) return "rating-good";
    if (notaIMDB >= 5 && notaIMDB < 8) return "rating-ok";
    return "rating-bad";
  };
  
  return (
    <Link href={`/filmes/${movie.objectId}`}>
      <div key={movie.id} className="movie-card">
        <img src={movie.posterUrl} alt={movie.titulo} onError={handleError} />
        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.titulo}</h3>
          <div>
            <span className="movie-card-genre">{movie.genero}</span>
            <span className={`movie-card-rating ${getRatingClass(movie.notaIMDB)}`}>
              {movie.notaIMDB}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
