"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieGrid from "../../../components/Movie/MovieGrid";
import Botao from "../../../components/Botao"; // componente de botão estilizado

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
    return filmes.sort((a, b) =>
      ordem === "asc" ? (a.likes || 0) - (b.likes || 0) : (b.likes || 0) - (a.likes || 0)
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const filmes = await carregar_filmes();
      const filmesOrdenados = ordenar_filmes(filmes, ordem);
      setRankedMovies(filmesOrdenados);
    };
    fetchData();
  }, [ordem]);

  return (
    <main className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-white font-[Urbanist]">
        Ranking: Por likes 
      </h1>

      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <Botao nome="Likes Decrescente" href="#" onClick={() => setOrdem("desc")} />
        <Botao nome="Likes Crescente" href="#" onClick={() => setOrdem("asc")} />
      </div>

      <MovieGrid movies={rankedMovies} />
    </main>
  );
}
