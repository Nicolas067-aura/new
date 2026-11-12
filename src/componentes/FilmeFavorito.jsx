import useFetch from "../hooks/useFetch";
import Card from "./Card";

function FilmeFavorito() {
  const { data: filme, loading, error } = useFetch(
    "https://www.omdbapi.com/?t=Interstellar&apikey=59ab1eb9",
  );

  if (loading) return <div id="social" className="status carregando">Carregando...</div>;
  if (error) return <div id="social" className="status erro">Ocorreu um erro inesperado</div>;

  return (
    <div id="social">
      <h2>Meu filme favorito</h2>
      <Card
        title={filme.Title}
        mediaUrl={filme.Poster}
        tags={filme.Genre ? filme.Genre.split(", ") : []}
        metadata={[
          { label: "Ano", value: filme.Year },
          { label: "Nota IMDB", value: filme.imdbRating },
        ]}
        cor="#1e3a8a"
      />
    </div>
  );
}

export default FilmeFavorito;
