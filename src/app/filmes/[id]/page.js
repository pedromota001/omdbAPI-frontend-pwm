"use client";

import { useEffect, useState } from "react";
import "./DetalhesFilme.css";
import { useParams } from "next/navigation";
import axios from "axios";
import CardExpandido from "../../../../components/CardExpandido";
import Cabecalho from "../../../../components/Cabecalho";

export default function DetalhesFilme() {
  const [filme, setFilme] = useState(null);
  const { id } = useParams(); 
  const url = "https://parseapi.back4app.com/classes/Filme/";

  async function carregar_filme(id_filme) {
    try {
      const response = await axios.get(url + id_filme, {
        headers: {
          "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
          "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      alert("Erro ao carregar filme", err);
      return null;
    }
  }

  useEffect(() => {
    const fetchFilme = async () => {
      const filme = await carregar_filme(id);
      setFilme(filme);
    };
    if (id) fetchFilme();
  }, [id]);

  const current_likes = async(id) => {
    try{
        const response = await axios.get(url + id, {
            headers:{
                "X-Parse-Application-Id":
                "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
                "X-Parse-REST-API-Key":
                "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
                "Content-Type": "application/json",
            }
        }
        );
        return parseInt(response.data.likes);
    }catch(err){
        console.log(err.response?.data)
        alert("Erro ao carregar série", err);
        return null;
    }
}

const onClickFunction = async (id) => {
    const currentLikes = await current_likes(id)
    try {  
      await axios.put(
        `https://parseapi.back4app.com/classes/Filme/${id}`,
        {
          likes: currentLikes + 1
        },
        {
          headers: {
            "X-Parse-Application-Id": "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
            "X-Parse-REST-API-Key": "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
            "Content-Type": "application/json"
          }
        }
      );
      alert("Like enviado!");
    } catch (err) {
        console.log(err.response?.data)
        console.error("Erro ao atualizar likes:", err);
    }
  };

  if (!filme) return <p>Carregando filme...</p>;

  return (
    <>
      <Cabecalho />
      <div className="filme-container">
        <CardExpandido object={filme} onClick={(id) => onClickFunction(id)} />
      </div>
    </>
  );
}
