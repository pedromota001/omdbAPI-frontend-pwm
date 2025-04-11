"use client";

import { useEffect, useState } from "react";
import "./DetalhesSerie.css"
import { useParams } from "next/navigation";
import axios from "axios";
import CardExpandido from "../../../../components/CardExpandido";
import Cabecalho from "../../../../components/Cabecalho";

export default function DetalhesSeries(){
    const [serie, setSerie] = useState(null);
    const {id} = useParams(); 
    const [likes, setLikes] = useState();
    const url = "https://parseapi.back4app.com/classes/Series/"

    async function carregar_serie(id_filme) {
        try{
            const response = await axios.get(url + id_filme, {
                headers:{
                    "X-Parse-Application-Id":
                    "GwnUACA5KJuULzj5Pf30JZhwXU0lkeu43Z1wnDoN",
                    "X-Parse-REST-API-Key":
                    "8wYzUlStyJkZFCgAh1aHHy035JPU1e8wNhgRtBqp",
                    "Content-Type": "application/json",
                }
            }
            );
            return response.data;
        }catch(err){
            alert("Erro ao carregar série", err);
            return [];
        }
    }

    useEffect(() => {
        const fetchSerie = async () => {
            const serie = await carregar_serie(id);
            setSerie(serie);
        };
        fetchSerie();
    }, [id])

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
            `https://parseapi.back4app.com/classes/Series/${id}`,
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

    return(
        <>
            <Cabecalho/>
            <div className="div-detalhes-serie">
                <CardExpandido object={serie} onClick={(id_filme) => onClickFunction(id_filme)}/>
            </div>
        </>
    )
}