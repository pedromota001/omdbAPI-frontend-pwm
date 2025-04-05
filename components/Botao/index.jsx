import Link from "next/link"
import "./botao.css"


const Botao = ({nome, href}) => {
    return(
        <>
        <Link className="inline-flex justify-center items-center button-page-inicial bg-red-600 m-2 text-white px-20 py-2 rounded hover:bg-[#0A1F44] transition" href={href}>
            {nome}
        </Link>
        </>
    )
}



export default Botao