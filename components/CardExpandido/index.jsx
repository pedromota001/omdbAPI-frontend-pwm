import DescritivoCardExpandido from "../DescritivoCardExpandido";
import "./CardExpandido.css";


const CardExpandido = ({object}) => {
    if (!object) return <p className="text-white text-center">Carregando dados...</p>;
    return(
        <>
            <div className="card-expandido-imagem">
                <img src={object.posterUrl} alt={object.titulo} className="rounded-2xl shadow-lg object-cover w-full h-auto"></img>
            </div>
            <div>  
                <DescritivoCardExpandido/>
            </div>
        </>
    )


}





export default CardExpandido