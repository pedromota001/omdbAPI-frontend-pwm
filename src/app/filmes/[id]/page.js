"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import "./DetalhesFilme.css";

export default function DetalhesFilme() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    async function fetchFilme() {
      try {
        const response = await axios.get(
          `https://parseapi.back4app.com/classes/Filme/${id}`,
          {
            headers: {
              "X-Parse-Application-Id":
                "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
              "X-Parse-REST-API-Key":
                "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
              "Content-Type": "application/json",
            },
          }
        );
        setFilme(response.data);
      } catch (err) {
        console.error("Erro ao buscar filme:", err);
      }
    }

    if (id) fetchFilme();
  }, [id]);

  if (!filme) return <p>Carregando filme...</p>;

  return (
    <div className="filme-container">
      <h1>{filme.titulo}</h1>

      <img
        src={filme.posterUrl}
        alt={filme.titulo}
        onError={(e) => (e.target.src = "/images/default.jpg")}
        className="filme-poster"
      />

      <div className="filme-info">
        <p>
          <strong>Nota IMDB:</strong>{" "}
          <span className={filme.notaIMDB > 7 ? "nota-verde" : "nota-normal"}>
            {filme.notaIMDB}
          </span>
        </p>

        <p>
          <strong>Sinopse:</strong>
        </p>
        <p>{filme.plot || filme.descricao || "Sinopse não disponível."}</p>
      </div>
    </div>
  );
}
