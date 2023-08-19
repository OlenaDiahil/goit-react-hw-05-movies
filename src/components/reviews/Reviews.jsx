import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { reviewsMovies } from '../Api/JsonthemoviedbApi';
import ErrorWrapper from 'pages/Error/ErrorWrapper';

const Reviews = () => {
  const { id } = useParams();
  const [reviewData, setReviewData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getMove() {
      try {
        const data = await reviewsMovies(id);
        const reviewData = data.results;
        setReviewData(reviewData);
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
        {reviewData.length === 0 ? (
          <h4>We don`t have any reviews for this movie</h4>
        ) : (
          <ul>
            {reviewData.map(({ id, author, content }) => (
              <li key={id}>
                <h4> Author: {author}</h4>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
      </ErrorWrapper>
    </section>
  );
};
export default Reviews;
