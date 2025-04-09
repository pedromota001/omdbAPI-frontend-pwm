import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [posters, setPosters] = useState({
    first: null,
    second: null,
    third: null,
  });

  const [imageGlow, setImageGlow] = useState({
    first: false,
    second: false,
    third: false,
  });

  const [showNameModal, setShowNameModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");

  const [toast, setToast] = useState({ message: "", visible: false });

  const handleSearch = async (e, position) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (!query) return;

      const apiKey = "ec406f50";
      const res = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          query
        )}&apikey=${apiKey}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setPosters((prev) => ({
          ...prev,
          [position]: data.Poster,
        }));

        // Glow temporário na imagem
        setImageGlow((prev) => ({
          ...prev,
          [position]: true,
        }));

        setTimeout(() => {
          setImageGlow((prev) => ({
            ...prev,
            [position]: false,
          }));
        }, 1500);
      } else {
        showToast("⚠️ Filme não encontrado!");
      }
    }
  };

  const resetRanking = () => {
    const posters = document.querySelectorAll(".poster");
    posters.forEach((p) => p.classList.add("fade-out"));

    // Aguarda a animação antes de limpar o estado
    setTimeout(() => {
      setPosters({ first: null, second: null, third: null });
      setImageGlow({ first: false, second: false, third: false });

      const inputs = document.querySelectorAll(".input");
      inputs.forEach((input) => (input.value = ""));
    }, 400); // o tempo da animação
  };

  const handleSaveClick = () => {
    setShowNameModal(true);
  };

  const saveRanking = async (user) => {
    setShowNameModal(false);
    const inputs = document.querySelectorAll(".input");
    const data = {
      first: inputs[1]?.value || "",
      second: inputs[0]?.value || "",
      third: inputs[2]?.value || "",
      username: user,
    };

    try {
      const res = await fetch("https://parseapi.back4app.com/classes/Rank", {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
          "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        showToast(`Ranking salvo com sucesso por ${user}!`);
      } else {
        showToast("⚠️ Erro ao salvar ranking: " + json.error);
      }
    } catch (err) {
      console.error(err);
      showToast("Erro inesperado ao salvar ranking.");
    }
  };

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  return (
    <div className="container">
      <h1 className="title">Rank Your Favorite Movies and Series</h1>

      <div className="podium">
        {/* 2nd Place */}
        <div className="podium-item">
          {posters.second && (
            <img
              src={posters.second}
              alt="Poster"
              className={`poster ${
                imageGlow.second ? "glow-animate silver-glow-img" : ""
              }`}
            />
          )}
          <div
            className={`podium-block second ${
              posters.second ? "silver-glow" : ""
            }`}
          >
            <div className="position silver">2</div>
            <input
              type="text"
              placeholder="2nd Place"
              className="input silver-border"
              onKeyDown={(e) => handleSearch(e, "second")}
            />
          </div>
        </div>

        {/* 1st Place */}
        <div className="podium-item">
          {posters.first && (
            <img
              src={posters.first}
              alt="Poster"
              className={`poster ${
                imageGlow.first ? "glow-animate gold-glow-img" : ""
              }`}
            />
          )}
          <div
            className={`podium-block first ${posters.first ? "gold-glow" : ""}`}
          >
            <div className="position gold">1</div>
            <input
              type="text"
              placeholder="1st Place"
              className="input gold-border"
              onKeyDown={(e) => handleSearch(e, "first")}
            />
          </div>
        </div>

        {/* 3rd Place */}
        <div className="podium-item">
          {posters.third && (
            <img
              src={posters.third}
              alt="Poster"
              className={`poster ${
                imageGlow.third ? "glow-animate bronze-glow-img" : ""
              }`}
            />
          )}
          <div
            className={`podium-block third ${
              posters.third ? "bronze-glow" : ""
            }`}
          >
            <div className="position bronze">3</div>
            <input
              type="text"
              placeholder="3rd Place"
              className="input bronze-border"
              onKeyDown={(e) => handleSearch(e, "third")}
            />
          </div>
        </div>
      </div>
      <p className="tips">
        Pro Tip: Hit Enter after choosing your Movies/Series
      </p>
      {toast.visible && <div className="toast">{toast.message}</div>}
      <div className="button-row-fixed">
        <button className="reset-button" onClick={resetRanking}>
          Resetar Ranking
        </button>
        <button className="save-button" onClick={handleSaveClick}>
          Salvar Ranking
        </button>
      </div>

      {showNameModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close"
              onClick={() => setShowNameModal(false)}
            >
              ×
            </button>
            <p className="modal-title">Deseja se identificar?</p>
            <input
              type="text"
              placeholder="Seu nome (opcional)"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="modal-input"
            />
            <div className="modal-buttons">
              <button
                onClick={() => saveRanking(usernameInput.trim() || "anonimo")}
                className="save-button"
              >
                Salvar
              </button>
              <button
                onClick={() => saveRanking("anônimo")}
                className="reset-button"
              >
                Salvar como Anônimo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
