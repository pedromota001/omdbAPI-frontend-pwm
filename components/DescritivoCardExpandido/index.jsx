import "./DescritivoCardExpandido.css"

const DescritivoCardExpandido = ({object}) => {
    const informacoes_basicas = "2004-2005" + " - " + object.genero + " - " + object.duracao
    const color_avaliacao = () => {
        if(object.notaIMDB < 7){
            return "#E61D41"
        }
        else if(object.notaIMDB < 8.5){
            return "#f5c518"
        }
        else{
            return "#22c55e"
        }
    }

    return(
        <div className="grid grid-cols-[1fr_1fr]">
            <div className="div-descricao-serie">
                <h1>{object.titulo}</h1>
                <p>{informacoes_basicas}</p>
                <p>{object.diretor === "N/A" ? "Diretor desconhecido" : object.diretor}</p>
                <p className="avaliacao-p" style={{backgroundColor:color_avaliacao()}}>{object.notaIMDB}</p>
                <div className="div-descricao-serie-sinopse self-end mt-6">
                    <p>{object.descricao}</p>
                    <p>País: {object.pais}</p>
                    <p>Prêmios: {object.premios}</p>
                </div>
                <div className="mt-48 font-medium font-[Montserrat] not-italic">
                    <p>Review: {object.email_user}</p>
                </div>
            </div>
            <div className="div-descricao-review">
                <h1>Review:</h1>
                <p>{object.comentario}</p>
            </div>
        </div>
    )
}

export default DescritivoCardExpandido