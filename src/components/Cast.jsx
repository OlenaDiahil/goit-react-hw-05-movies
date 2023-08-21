import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { fetchCredits } from '../services/api';

const Cast = () => {
  const { id } = useParams({});
  const [credits, setCredits] = useState({ dafault: 1234 });

  useEffect(() => {
    fetchCredits(id).then(({ data }) => {
      setCredits(data.cast);
    });
  }, [id]);

  return (
    <div>
      <ul>
        {credits.length ? (
          credits.map(credit => (
            <li key={credit.id}>
              {credit.character}
              <img
                src={
                  credit.profile_path
                    ? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
                    : 'https://image.tmdb.org/t/p/w185/qoVESlEjMLIbdDzeXwsYrSS2jpw.jpg'
                }
                alt={credit.character}
              />
            </li>
          ))
        ) : (
          <li>Wait...</li>
        )}
      </ul>
    </div>
  );
};


export default Cast;
