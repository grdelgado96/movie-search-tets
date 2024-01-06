import { useCallback, useRef } from "react";
import "./App.css";
import { useState } from "react";
import Movies from "../components/Movies";
import debounce from "just-debounce-it";

const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=a343abba&s=";

function App() {
  const search = useRef();
  const prevSearch = useRef(null);
  const [movies, setMovies] = useState([]);

  const debouncedGetMovies = useCallback(
    debounce(() => {
      console.log("Searching for", search.current.value);
      getMovies();
    }, 500),
    []
  );

  const getMovies = () => {
    if (prevSearch.current === search.current.value) return;
    if (search.current.value === "") {
      setMovies([]);
      return;
    }
    fetch(`${API_URL_SEARCH}${search.current.value}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.Search);
        prevSearch.current = search.current.value;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    debouncedGetMovies();
  };

  return (
    <div className="page">
      <header>
        <h1>Movie Search</h1>
        <form className="form" onClick={handleSubmit}>
          <input
            onChange={handleChange}
            ref={search}
            type="text"
            placeholder="Avengers, Star Wars, The Matrix..."
          />
          <button>Search</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
