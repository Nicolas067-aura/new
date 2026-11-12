import { useEffect, useState } from "react";
import "./App.css";
import Perfil from "./componentes/Perfil";
import Pokemon from "./componentes/Pokemon";
import FilmeFavorito from "./componentes/FilmeFavorito";
import MovieEe from "./componentes/MovieEe";
import Footer from "./componentes/Footer";
import ThemeButton from "./componentes/theme-button";

function App() {
  const [dark, setDark] = useState(() => {
    const salvo = localStorage.getItem("tema");
    if (salvo) return salvo === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("tema", dark ? "dark" : "light");
  }, [dark]);

  return (
    <>
      <ThemeButton dark={dark} onToggle={() => setDark(!dark)} />

        <MovieEe />

      <main>
        <Perfil />

        <div className="ticks"></div>

        <section id="next-steps">
          <FilmeFavorito />
          <Pokemon />
        </section>

        <div className="ticks"></div>

        <section id="busca">

        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
