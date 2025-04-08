"use client";

import React, { useEffect, useState } from "react";
import MovieGrid from "../../../components/Movie/MovieGrid.jsx";
import axios from "axios";

export default function SeriesPage() {
  const [series, setSeries] = useState([]);

  async function carregar_series() {
    try {
      const response = await axios.get(
        "https://parseapi.back4app.com/classes/Filme",
        {
          headers: {
            "X-Parse-Application-Id":
              "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
            "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.results;
    } catch (err) {
      alert("Erro ao carregar reviews", err);
      return [];
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const series = await carregar_series();
      setMovies(series);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>pagina de series</h1>
      <MovieGrid series={series}></MovieGrid>
    </>
  );
}

/*a ser implementada*/
