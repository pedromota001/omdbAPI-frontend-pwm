import React from "react";
import MovieCard from "./MovieCard.jsx";
import "./styles.css"

export default function MovieGrid({ movies, fluxo }) {
  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Movies..."
      />
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.objectId} movie={movie} fluxo={fluxo} />
        ))}
      </div>
    </div>
  );
}
