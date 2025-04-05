import React from "react";
import MovieCard from "./MovieCard";
//import styles.css

export default function MovieGrid({ movies }) {
  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Movies..."
      />
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
