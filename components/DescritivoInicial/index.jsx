import "./descritivo-inicial.css"
import Botao from "../Botao"

const DescritivoInicial = () => {
    return(
        <> 
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-white text-center">Qual a opção pra hoje?</h1>
            <div className="flex flex-col justify-center items-center">
                <Botao nome="Series"/>
                <Botao nome="Filmes"/>
            </div>
        </div>

        </>
    )
}


export default DescritivoInicial