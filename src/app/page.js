import Cabecalho from "../../components/Cabecalho";
import DescritivoInicial from "../../components/DescritivoInicial";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <Cabecalho/>
      <div className="div-boas-vindas">
        <h1>Bem vindo ao CineApp</h1>
        <p>Monte seu próprio catálogo de filmes, adicione títulos à sua lista e nunca mais esqueça o que você já assistiu!</p>
        <Image src="/pipoca.png" alt="imagem de pipoca" width={200} height={200}/>
      </div>
      <DescritivoInicial/>
    </div>
  );
}
