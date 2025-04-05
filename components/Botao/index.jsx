import "./botao.css"


const Botao = ({nome, onClick}) => {
    return(
        <>
            <div className="botoes-descritivo-inicial">
                <button onClick={onClick} className="bg-red-600 m-2 text-white px-20 py-2 rounded hover:bg-[#0A1F44] transition">
                    {nome}
                </button>
            </div>
        </>
    )
}



export default Botao