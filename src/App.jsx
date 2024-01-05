import { useRef } from "react";
import "./App.css";
import { useState } from "react";


const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=a343abba&s=";

function App() {
  const title = useRef();
  const [movies, setMovies] = useState([]);
  
  const fetchMovie = (e) => {
    e.preventDefault();
    if (title.current.value === "") return;
    fetch(`${API_URL_SEARCH}${title.current.value}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search);
      });
  };
  return (
    <div className="page">
      <header>
        <h1>Movie Search</h1>
        <form className="form">
          <input
            ref={title}
            type="text"
            placeholder="Avengers, Star Wars, The Matrix..."
          />
          <button onClick={fetchMovie}>Search</button>
        </form>
      </header>
      <main>
        <h1>Results:</h1>
        {movies && 
          movies.map((movie) => (
            <div className="movie" key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;
