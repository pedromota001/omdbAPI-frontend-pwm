"use client";

import { useEffect, useState } from "react";
import "./DetalhesSerie.css"
import { useParams } from "next/navigation";
import axios from "axios";
import CardExpandido from "../../../../components/CardExpandido";

export default function DetalhesSeries(){
    const [serie, setSerie] = useState(null);
    const {id} = useParams(); 
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
    

    return(
        <>
            <div className="div-detalhes-serie">
                <CardExpandido object={serie}/>
            </div>
        </>
    )
}