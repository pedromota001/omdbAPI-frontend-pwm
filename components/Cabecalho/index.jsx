import "./cabecalho.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";


const Cabecalho = () => {
    return(
        <header className="cabecalho">
            <div className="div-icon div-icon flex items-center gap-2">
                <h1>CineApp</h1>
                <div className="icon-film"><FontAwesomeIcon icon={faFilm} /></div>
            </div>
        </header>
    )
}

export default Cabecalho