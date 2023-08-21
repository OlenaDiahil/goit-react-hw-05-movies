import React from 'react';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { fetchMovieReview } from '../services/api';
const Reviews = () => {
  const { id } = useParams({});
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    fetchMovieReview(id).then(({ data }) => {
      setReviews(data.results);
    });
  }, [id]);

  return (
    <div>
      Reviews:
      <ul>
        {reviews.length ? (
          reviews.map(({ author, content }) => {
            return (
              <li key={author}>
                <h3>Author: {author}</h3>
                <div>{content}</div>
              </li>
            );
          })
        ) : (
          <div>No reviews</div>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
