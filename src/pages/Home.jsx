import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getMovies } from '../components/Api/JsonthemoviedbApi';
import ErrorWrapper from './Error/ErrorWrapper';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getMove() {
      try {
        setIsLoaderVisible(true);
        const data = await getMovies();
        const movies = data.results;
        setMovies(movies);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoaderVisible(false);
      }
    }
    getMove();
  }, []);

  return (
    <main>
      <h1> Trending today</h1>
      {isLoaderVisible && <h3>Loading...</h3>}
      <ErrorWrapper isError={isError}>
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
export default Home;
