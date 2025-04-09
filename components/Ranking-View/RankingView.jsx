import React, { useEffect, useState } from "react";
import "./styles.css";

export default function VerRankings() {
  const [rankings, setRankings] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    const fetchFromBack4App = async () => {
      const res = await fetch(
        `https://parseapi.back4app.com/classes/Rank?limit=10&skip=${
          (paginaAtual - 1) * 10
        }&order=-createdAt`,
        {
          headers: {
            "X-Parse-Application-Id":
              "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
            "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
          },
        }
      );

      const data = await res.json();
      const rankings = data.results;

      const enriched = await Promise.all(
        rankings.map(async (ranking) => {
          const filmes = ["first", "second", "third"];

          const posters = await Promise.all(
            filmes.map(async (pos) => {
              const apiKey = "ec406f50";
              const res = await fetch(
                `https://www.omdbapi.com/?t=${encodeURIComponent(
                  ranking[pos]
                )}&apikey=${apiKey}`
              );
              const data = await res.json();
              return data.Poster !== "N/A" ? data.Poster : null;
            })
          );

          return { ...ranking, posters };
        })
      );

      setRankings(enriched);
    };

    fetchFromBack4App();
  }, [paginaAtual]);

  return (
    <div className="ranking-page">
      <h1 className="page-title">Rankings Salvos</h1>

      <div className="ranking-list">
        {rankings.map((ranking, index) => (
          <div key={index} className="ranking-card">
            <div className="card-header">
              <span className="username">{ranking.username || "anônimo"}</span>
              <span className="likes">👍 0</span>
            </div>
            <div className="card-films">
              <div className="film-pick">
                <span className="pos">🥇</span>
                <img
                  src={ranking.posters[0]}
                  alt="1º"
                  className="gold-glow-img"
                />
              </div>
              <div className="film-pick">
                <span className="pos">🥈</span>
                <img
                  src={ranking.posters[1]}
                  alt="2º"
                  className="silver-glow-img"
                />
              </div>
              <div className="film-pick">
                <span className="pos">🥉</span>
                <img
                  src={ranking.posters[2]}
                  alt="3º"
                  className="bronze-glow-img"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual((p) => p - 1)}
        >
          Anterior
        </button>
        <span>Página {paginaAtual}</span>
        <button onClick={() => setPaginaAtual((p) => p + 1)}>Próxima</button>
      </div>
    </div>
  );
}
