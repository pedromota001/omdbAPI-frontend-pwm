"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import SeriesGrid from "../../../../components/Movie/MovieGrid"; // ou SeriesGrid se tiver separado
import Botao from "../../../../components/Botao";

export default function RankingSeriesPage() {
  const [series, setSeries] = useState([]);
  const [ordem, setOrdem] = useState<"asc" | "desc" | "nome">("desc");

  const fetchSeries = useCallback(async () => {
    try {
      const response = await axios.get("https://parseapi.back4app.com/classes/Serie", {
        headers: {
          "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
          "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
          "Content-Type": "application/json",
        },
      });
      return response.data.results || [];
    } catch (error) {
      console.error("Erro ao buscar séries:", error);
      alert("Erro ao carregar séries: " + error.message);
      return [];
    }
  }, []);

  const ordenarSeries = (lista, ordem) => {
    return [...lista].sort((a, b) => {
      const likesA = a.likes || 0;
      const likesB = b.likes || 0;

      if (ordem === "asc") return likesA - likesB;
      if (ordem === "desc") return likesB - likesA;
      if (ordem === "nome") {
        const nomeA = a.nome?.toLowerCase() || "";
        const nomeB = b.nome?.toLowerCase() || "";
        return nomeA.localeCompare(nomeB);
      }

      return 0;
    });
  };

  useEffect(() => {
    const carregarSeries = async () => {
      const dados = await fetchSeries();
      const ordenadas = ordenarSeries(dados, ordem);
      setSeries(ordenadas);
    };
    carregarSeries();
  }, [fetchSeries, ordem]);

  return (
    <main className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-white font-[Urbanist]">
        Ranking: Séries Mais Curtidas
      </h1>

      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <Botao nome="Likes Decrescente" href="#" onClick={() => setOrdem("desc")} />
        <Botao nome="Likes Crescente" href="#" onClick={() => setOrdem("asc")} />
        <Botao nome="Nome A-Z" href="#" onClick={() => setOrdem("nome")} />
      </div>

      <MovieGrid movies={series} />
    </main>
  );
}
