import { useState, useEffect, useRef, Suspense } from 'react';
import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { detailsMovies } from '../Api/JsonthemoviedbApi';
import Button from '../button/Button';
import ErrorWrapper from 'pages/Error/ErrorWrapper';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    async function getMove() {
      try {
        const data = await detailsMovies(id);
        const movies = data;
        setMovies(movies);
        const genres = movies.genres;
        setGenres(genres);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
      }
    }
    getMove();
  }, [id]);

  const { title, vote_average, overview, backdrop_path } = movies;

  return (
    <main>
      <Button to={backLinkHref.current} />
      <ErrorWrapper isError={isError}>
        <div className={css.details}>
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt=""
            height={360}
          />
          <div>
            <h2>{title}</h2>
            <p>{`User Score: ${vote_average}`}</p>
            <h4>Overview</h4>
            <p>{overview}</p>
            <h3>Genres</h3>
            {genres.map(({ id, name }) => (
              <span key={id}>{name}, </span>
            ))}
          </div>
        </div>
        <div className={css.addInform}>
          <h5>Additional information</h5>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </div>
        <Suspense
          fallback={
            <div>
              <h3>Loading...</h3>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </ErrorWrapper>
    </main>
  );
};
export default MovieDetails;
