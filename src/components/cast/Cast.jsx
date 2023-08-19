import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { castMovies } from '../Api/JsonthemoviedbApi';
import ErrorWrapper from 'pages/Error/ErrorWrapper';
import css from './Cast.module.css';

const Cast = () => {
  const { id } = useParams();
  const [castData, setCastData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getMove() {
      try {
        const data = await castMovies(id);
        const castData = data.cast;
        setCastData(castData);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
      }
    }
    getMove();
  }, [id]);

  return (
    <section>
      <ErrorWrapper isError={isError}>
        <ul>
          {castData.map(({ id, name, character, profile_path }) => (
            <div key={id} className={css.item}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt=""
                />
              ) : (
                <p>Sorry, No photo</p>
              )}
              <li className={css.itemName}>
                <div>{name}</div>
                <p>Character: {character}</p>
              </li>
            </div>
          ))}
        </ul>
      </ErrorWrapper>
    </section>
  );
};
export default Cast;
