"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieGrid from "../../../../components/Movie/MovieGrid"; 
import Cabecalho from "../../../../components/Cabecalho";

export default function RankingSeriesPage() {
  const [rankedSeries, setRankedSeries] = useState([]);
  const [ordem, setOrdem] = useState("desc");

  async function carregar_series() {
    try {
      const response = await axios.get("https://parseapi.back4app.com/classes/Series", {
        headers: {
          "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
          "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
          "Content-Type": "application/json",
        },
      });

      return response.data.results;
    } catch (err) {
      console.error("Erro ao carregar séries:", err);
      alert("Erro ao carregar séries: " + err.message);
      return [];
    }
  }

  function ordenar_series(series, ordem) {
    const copia = [...series];
    const ordenadas = copia.sort((a, b) =>
      ordem === "asc"
        ? parseInt(a.likes || 0) - parseInt(b.likes || 0)
        : parseInt(b.likes || 0) - parseInt(a.likes || 0)
    );
    console.log("Séries ordenadas:", ordenadas.map(s => ({ nome: s.nome, likes: s.likes })));
    return ordenadas;
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect acionado com ordem:", ordem);
      const series = await carregar_series();
      const ordenadas = ordenar_series(series, ordem);
      setRankedSeries(ordenadas);
    };
    fetchData();
  }, [ordem]);

  return (
    <>
      <Cabecalho />
      <main className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-white font-[Urbanist]">
          Ranking: Séries Mais Curtidas
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

        <MovieGrid movies={rankedSeries} /> 
      </main>
    </>
  );
}
