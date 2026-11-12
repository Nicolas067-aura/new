import useFetch from "../hooks/useFetch";

function pegarId(url) {
  return url.split("/").filter(Boolean).pop();
}

function Etapa({ no }) {
  const id = pegarId(no.species.url);

  return (
    <li>
      <div className="etapa">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={no.species.name}
        />
        <span>{no.species.name}</span>
      </div>

      {no.evolves_to.length > 0 && (
        <ul>
          {no.evolves_to.map((proximo) => (
            <Etapa key={proximo.species.name} no={proximo} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Evolucao({ especieUrl }) {
  const especie = useFetch(especieUrl);
  const cadeia = useFetch(especie.data?.evolution_chain?.url ?? null);

  if (especie.loading || cadeia.loading) {
    return <p className="status carregando">Carregando evoluções...</p>;
  }
  if (especie.error || cadeia.error) {
    return <p className="status erro">Não deu pra carregar as evoluções.</p>;
  }
  if (!cadeia.data) return null;

  const raiz = cadeia.data.chain;

  return (
    <div className="evolucao">
      <h3>Linha evolutiva</h3>
      {raiz.evolves_to.length === 0 && <p>Esse pokémon não evolui.</p>}
      <ul className="arvore">
        <Etapa no={raiz} />
      </ul>
    </div>
  );
}

export default Evolucao;
