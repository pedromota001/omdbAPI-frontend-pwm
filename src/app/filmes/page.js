"use client";
import MovieGrid from "../../../components/Movie/MovieGrid";
import React, { useEffect, useState } from "react";
export default function FilmesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/getMovies") //linkar com back4app, ajustar o caminho crreto
      .then((response) => response.json)
      .then((data) => setMovies(data));
  }, []);

  return (
    <>
      <h1>pagina de filmes</h1>
      <MovieGrid movies={movies}></MovieGrid>
    </>
  );
}

/*a ser implementada*/
