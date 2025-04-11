import React, {useState} from "react";
import MovieCard from "./MovieCard.jsx";
import "./styles.css"

export default function MovieGrid({ movies, fluxo }) {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.titulo.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesSearchTerm(movie, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Movies or filmes..."
        value={searchTerm}
        onChange={handleSearchTerm}
      />
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.objectId} movie={movie} fluxo={fluxo} />
        ))}
      </div>
    </div>
  );
}
