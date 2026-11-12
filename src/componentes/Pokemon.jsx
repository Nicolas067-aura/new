import { useState } from "react";
import useFetch from "../hooks/useFetch";
import PokemonCard from "./PokemonCard";
import Evolucao from "./Evolucao";

function sortearId() {
  return Math.floor(Math.random() * 1025) + 1;
}

function pegarStatus(poke, nome) {
  return poke.stats.find((s) => s.stat.name === nome).base_stat;
}

function Pokemon() {
  const [id, setId] = useState(sortearId);
  const { data: poke, loading, error } = useFetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
  );

  function sortear() {
    if (loading) return;
    let novo = sortearId();
    while (novo === id) novo = sortearId();
    setId(novo);
  }

  return (
    <div id="docs">
      <h2>Pokémon aleatório</h2>

      <button
        type="button"
        className="counter"
        onClick={sortear}
        disabled={loading}
      >
        {loading ? "Procurando..." : "Sortear pokémon"}
      </button>

      {loading && <p className="status carregando">Carregando...</p>}

      {error && (
        <p className="status erro">
          Não deu pra carregar o pokémon. Tenta sortear de novo.
        </p>
      )}

      {poke && (
        <>
          <PokemonCard
            nome={poke.name}
            imagem={
              poke.sprites.other["official-artwork"].front_default ||
              poke.sprites.front_default
            }
            tipos={poke.types.map((t) => t.type.name)}
            vida={pegarStatus(poke, "hp")}
            ataque={pegarStatus(poke, "attack")}
          />
          <Evolucao especieUrl={poke.species.url} />
        </>
      )}
    </div>
  );
}

export default Pokemon;
