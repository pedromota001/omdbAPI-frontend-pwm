import DescritivoCardExpandido from "../DescritivoCardExpandido";
import "./CardExpandido.css";


const CardExpandido = ({object}) => {
    if (!object) return <p className="text-white text-center">Carregando dados...</p>;
    return(
        <>
            <div className="card-expandido-imagem">
                <img src={object.posterUrl} alt={object.titulo} className="rounded-2xl shadow-lg object-cover w-[405px] h-auto mr-1"></img>
            </div>
            <div className="card-expandido-descricao">  
                <DescritivoCardExpandido object={object}/>
            </div>
        </>
    )

}





export default CardExpandido