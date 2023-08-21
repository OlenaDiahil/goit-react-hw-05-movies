import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchSearchMovie } from '../services/api';
import { useLocation } from 'react-router-dom';
const Search = () => {
  const [value, setValue] = useState('');
  const [list, setList] = useState('');
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const onSubmitSeart = e => {
    e.preventDefault();
    setSearchParams(value ? { query: value } : {});
  };

  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      fetchSearchMovie(query).then(({ data }) => {
        setList(data.results);
      });
    }
  }, [query]);

  return (
    <div>
      <h1>Search movies</h1>
      <form onSubmit={onSubmitSeart}>
        <input
          onChange={e => setValue(e.target.value)}
          value={value}
          type="text"
          name="lastName"
          placeholder="Enter film"
        />
        <button>Search</button>
      </form>
      <hr />
      <ul>
        {list &&
          list.map(el => (
            <li key={el.id}>
              <Link state={{ from: location }} to={`/movies/${el.id}`}>
                {el.original_title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
