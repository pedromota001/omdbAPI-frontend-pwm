"use client";
import MovieGrid from "../../../components/Movie/MovieGrid";
import React, { useEffect, useState } from "react";
export default function FilmesPage() {
  const [movies, setMovies] = useState([]);
  
  async function carregar_filmes(){
    try{
      const response = await axios.get("https://parseapi.back4app.com/classes/Filme",
        {headers: {
        "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
        "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
        "Content-Type": "application/json",
        }}
      )
      return response.data.results
    }catch(err){
      alert("Erro ao carregar reviews", err);
      return []
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const filmes = await carregar_filmes();
      setMovies(filmes);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>pagina de filmes</h1>
      <MovieGrid movies={movies}></MovieGrid>
    </>
  );
}

/*a ser implementada*/
