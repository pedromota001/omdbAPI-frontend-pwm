"use client";
import axios from "axios";
import MovieGrid from "../../../components/Movie/MovieGrid";
import React, { useEffect, useState } from "react";
import Cabecalho from "../../../components/Cabecalho";
import Modal from "../../../components/Modal";

export default function FilmesPage() {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const url = "https://www.omdbapi.com/?t=";
    const apiKey = "&apikey=6585022c";

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

  useEffect(() => {
    const fetchData = async () => {
      const filmes = await carregar_filmes();
      setMovies(filmes);
    };
    fetchData();
  }, []);

  const onCloseModal = () => {
    setShowModal(false);
  }

  const onSubmitModalFilme = async (titulo, email, review) => {
    const titulo_formatado = titulo.replaceAll(" ", "+");
    try{
      const response = await axios.get(url + titulo_formatado + apiKey);
      console.log(response.data.Type);
      if(response && response.data.Type === "movie"){
        const filme = response.data;
        await axios.post(
          "https://parseapi.back4app.com/classes/Filme",
          {
            titulo: filme.Title,
            genero: filme.Genre,
            duracao: filme.Runtime,
            descricao: filme.Plot,
            diretor: filme.Director,
            pais: filme.Country,
            premios: filme.Awards,
            notaIMDB: parseInt(filme.imdbRating),
            comentario: review,
            user_email: email,
            posterUrl: filme.Poster
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
        const atualizadas = await carregar_filmes();
        setMovies(atualizadas);
        alert("Review salvo com sucesso")
      }
      else{
        console.log("erro")
        alert("Erro ao encontrar filme");
      }
    }catch(err){
      console.error("Erro ao enviar review:", err);
      console.log("Detalhes do erro:", err.response?.data);
      alert("Erro ao salvar a review");
    }
  }


  return (
    <>
      <Cabecalho></Cabecalho>
      <div className="flex justify-end mt-4 mr-4">
        <button className="bg-[#FF4C4C] text-white font-bold py-2 px-4 rounded transition hover:bg-[#e84343] hover:scale-105 hover:shadow-lg" 
        onClick={() => setShowModal(true)}>
          Adicionar review
        </button>
      </div>
      <Modal visible={showModal} onClose={() => onCloseModal()} onSubmit={(titulo, email, review) => onSubmitModalFilme(titulo, email, review)}/>
      <MovieGrid movies={movies} />
    </>
  );
}
