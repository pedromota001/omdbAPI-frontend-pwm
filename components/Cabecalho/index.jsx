import "./cabecalho.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Cabecalho = () => {
    return (
        <header className="cabecalho">
            <div className="div-icon">
                <h1>CineApp</h1>
                <div className="icon-film">
                    <FontAwesomeIcon icon={faFilm} />
                </div>
            </div>
            <Link href="/" className="btn-voltar-home">
                <FontAwesomeIcon icon={faArrowLeft} />
                Início
            </Link>
        </header>
    );
}

export default Cabecalho;
