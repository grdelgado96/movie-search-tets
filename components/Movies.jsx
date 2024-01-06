function Movies({ movies }) {
  return (
    <div>
        <h1>Results:</h1>
      {movies && (
        <ul className="movies">
          {movies.map((movie) => (
            <li className="movie" key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          ))}
        </ul>
      )}
      {!movies&& <p>No results</p>}
    </div>
  );
}
export default Movies;
