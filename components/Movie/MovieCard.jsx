import React from "react";
import Link from "next/link";
import "./styles.css";

export default function MovieCard({ movie }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  return (
    <Link href={`/filmes/${movie.objectId}`} className="movie-card-link">
      <div key={movie.id} className="movie-card">
        <img src={movie.poster} alt={movie.title} onError={handleError} />
        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.titulo}</h3>
          <div>
            <span className="movie-card-genre">{movie.genero}</span>
            <span className="movie-card-rating">{movie.notaIMDB}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}