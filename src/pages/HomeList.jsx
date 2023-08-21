import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingMovie } from '../services/api';

const HomeList = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchTrendingMovie().then(({ data }) => {
      setFilms(data.results);
    });
  }, []);

  return (
    <div>
      <div>Trending today</div>
      <ul>
        {films.map(film => (
          <li key={film.id}>
            <Link to={`/movies/${film.id}`}>{film.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeList;
