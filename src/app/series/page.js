"use client";

import React, { useEffect, useState } from "react";
import MovieGrid from "../../../components/Movie/MovieGrid.jsx";
import axios from "axios";
import Cabecalho from "../../../components/Cabecalho/index.jsx";
import Modal from "../../../components/Modal/index.jsx";

export default function SeriesPage() {
  const [series, setSeries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const url = "https://www.omdbapi.com/?t=";
  const apiKey = "&apikey=6585022c";

  async function carregar_series() {
    try {
      const response = await axios.get(
        "https://parseapi.back4app.com/classes/Series",
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
      setSeries(series);
    };
    fetchData();
  }, []);


  const onCloseModal = () => {
    setShowModal(false);
  }
  
  const onSubmitModalSerie = async (titulo, email, review) => {
    const titulo_formatado = titulo.replaceAll(" ", "+");
    try{
      const response = await axios.get(url + titulo_formatado + apiKey);
      console.log(response.data.Type);
      if(response && response.data.Type === "series"){
        const serie = response.data;
        await axios.post(
          "https://parseapi.back4app.com/classes/Series",
          {
            titulo: serie.Title,
            genero: serie.Genre,
            duracao: serie.Runtime,
            descricao: serie.Plot,
            diretor: serie.Director,
            pais: serie.Country,
            premios: serie.Awards,
            notaIMDB: parseInt(serie.imdbRating),
            comentario: review,
            user_email: email,
            posterUrl: serie.Poster
          },
          {
            headers: {
              "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
              "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
              "Content-Type": "application/json"
            }
          }
        );
        setShowModal(false);
        const atualizadas = await carregar_series();
        setSeries(atualizadas);
        alert("Review salvo com sucesso")
      }
      else{
        console.log("erro")
        alert("Erro ao encontrar série");
      }
    }catch(err){
      console.error("Erro ao enviar review:", err);
      console.log("Detalhes do erro:", err.response?.data);
      alert("Erro ao salvar a review");
    }
  }

  return (
    <>
      <Cabecalho/>
      <div className="flex justify-end mt-4 mr-4">
        <button className="bg-[#FF4C4C] text-white font-bold py-2 px-4 rounded transition hover:bg-[#e84343] hover:scale-105 hover:shadow-lg" 
        onClick={() => setShowModal(true)}>
          Adicionar review
        </button>
      </div>
      <Modal visible={showModal} onClose={() => onCloseModal()} onSubmit={(titulo, email, review) => onSubmitModalSerie(titulo, email, review)}/>
      <MovieGrid movies={series} fluxo={"series"}></MovieGrid>
    </>
  );
}
