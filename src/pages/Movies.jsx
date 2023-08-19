import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import css from './cssPages/Movies.module.css';
import ErrorWrapper from './Error/ErrorWrapper';
import { searchMovies } from 'components/Api/JsonthemoviedbApi';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    async function getMove() {
      try {
        const data = await searchMovies(query);
        const movies = data.results;
        setMovies(movies);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
      }
    }
    getMove();
  }, [query]);

  const handleSumbit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <main>
      <ErrorWrapper isError={isError}>
        <form onSubmit={handleSumbit}>
          <input
            name="query"
            className={css.input}
            type="text"
            placeholder="Search movies"
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
        <ul>
          {movies.map(({ id, title, name }) => (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title || name}
              </Link>
            </li>
          ))}
        </ul>
      </ErrorWrapper>
    </main>
  );
};
export default Movies;
