import DescritivoCardExpandido from "../DescritivoCardExpandido";
import "./CardExpandido.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const CardExpandido = ({object, onClick}) => {

    const onHandleClick = (event) => {
        event.preventDefault();
        onClick(object.objectId);
    }


    if (!object) return <p className="text-white text-center">Carregando dados...</p>;
    return(
        <>
            <div className="card-expandido-imagem">
                <img src={object.posterUrl} alt={object.titulo} className="rounded-2xl shadow-lg object-cover w-[405px] h-auto mr-1"></img>
                <button className="self-start mt-2 p-1 text-red-500 hover:scale-105" onClick={onHandleClick}>
                    <FontAwesomeIcon icon={faHeart} className="icon-like text-sm" />
                </button>
            </div>
            <div className="card-expandido-descricao">  
                <DescritivoCardExpandido object={object}/>
            </div>
        </>
    )

}





export default CardExpandido