"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieGrid from "../../../../components/Movie/MovieGrid";
import Cabecalho from "../../../../components/Cabecalho";
 
export default function RankingPage() {
  const [rankedMovies, setRankedMovies] = useState([]);
  const [ordem, setOrdem] = useState("desc");
 
  async function carregar_filmes() {
    try {
      const response = await axios.get("https://parseapi.back4app.com/classes/Filme", {
        headers: {
          "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
          "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
          "Content-Type": "application/json",
        },
      });
 
      return response.data.results;
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
      alert("Erro ao carregar filmes: " + err.message);
      return [];
    }
  }
 
  function ordenar_filmes(filmes, ordem) {
    const filmesCopia = [...filmes];
    const ordenados = filmesCopia.sort((a, b) =>
      ordem === "asc"
        ? parseInt(a.likes || 0) - parseInt(b.likes || 0)
        : parseInt(b.likes || 0) - parseInt(a.likes || 0)
    );
    console.log("Filmes ordenados:", ordenados.map(f => ({ titulo: f.titulo, likes: f.likes })));
    return ordenados;
  }
 
  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect acionado com ordem:", ordem);
      const filmes = await carregar_filmes();
      const filmesOrdenados = ordenar_filmes(filmes, ordem);
      setRankedMovies(filmesOrdenados);
    };
    fetchData();
  }, [ordem]);
 
  return (
    <>
      <Cabecalho />
      <main className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-white font-[Urbanist]">
          Ranking: Por likes
        </h1>
 
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          <button
            onClick={() => setOrdem("desc")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Likes Decrescente
          </button>
          <button
            onClick={() => setOrdem("asc")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Likes Crescente
          </button>
        </div>
 
        <MovieGrid movies={rankedMovies} />
      </main>
    </>
  );
}