import "./descritivo-inicial.css"
import Botao from "../Botao"

const DescritivoInicial = () => {
    return(
        <>
        <div className="div-descritivo-inicial flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-white text-center px-4 py-2 rounded">Qual a opção pra hoje?</h1>
            <div className="flex flex-col justify-center items-center">
                <Botao nome="Series" href={"/series"}/>
                <Botao nome="Filmes" href={"/filmes"}/>
                <Botao nome="Ranks" href={"/rank"}/>
                <Botao nome="Cadastro de ranks" href={"/rankCreate"}/>
                <Botao nome="Top 10 reviews de filmes" href={"/filmes/maisLikes"}/>
            </div>
        </div>
        </>
    )
}


export default DescritivoInicial