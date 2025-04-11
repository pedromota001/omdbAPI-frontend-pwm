import Cabecalho from "../../components/Cabecalho";
import DescritivoInicial from "../../components/DescritivoInicial";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8">
      <Cabecalho/>
      <div className="div-boas-vindas">
        <h1>Bem vindo ao CineApp</h1>
        <p>Avalie filmes e séries. Compartilhe suas opiniões e veja o que outros acharam também!</p>
        <Image src="/pipoca.png" alt="imagem de pipoca" width={200} height={200}/>
      </div>
      <DescritivoInicial/>
    </div>
  );
}
