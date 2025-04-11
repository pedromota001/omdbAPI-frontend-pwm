"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SeriesGrid from "../../../components/Movie/MovieGrid"; // ou SeriesGrid se tiver separado
import Botao from "../../../components/Botao";

export default function RankingSeriesPage() {
  const [series, setSeries] = useState([]);
  const [ordenado, setOrdenado] = useState(false);

  async function carregarSeries() {
    try {
      const response = await axios.get("https://parseapi.back4app.com/classes/Serie", {
        headers: {
          "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
          "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
          "Content-Type": "application/json",
        },
      });

      return response.data.results || [];
    } catch (err) {
      console.error("Erro ao carregar séries:", err);
      alert("Erro ao carregar séries: " + err.message);
      return [];
    }
  }

  function ordenarPorCurtidas(lista) {
    return [...lista].sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  useEffect(() => {
    const fetchData = async () => {
      const dados = await carregarSeries();
      const resultado = ordenado ? ordenarPorCurtidas(dados) : dados;
      setSeries(resultado);
    };
    fetchData();
  }, [ordenado]);

  return (
    <main className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-white font-[Urbanist]">
        Ranking: Séries Mais Curtidas
      </h1>

      <div className="flex justify-center gap-4 flex-wrap mb-6">
        <Botao
          nome="Ranking por Curtidas"
          href="#"
          onClick={() => setOrdenado(true)}
        />
      </div>

      <SeriesGrid movies={series} />
    </main>
  );
}
