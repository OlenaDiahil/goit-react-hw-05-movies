import axios from 'axios';

const myApiKey = 'e4e77b2d83733ec5f4ee2698cbe57afc';

export const getMovies = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${myApiKey}`
  );
  return data;
};

export const searchMovies = async query => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${myApiKey}&query=${query}`
  );
  return data;
};

export const detailsMovies = async id => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${myApiKey}`
  );
  return data;
};

export const castMovies = async id => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${myApiKey}`
  );
  return data;
};

export const reviewsMovies = async id => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${myApiKey}`
  );
  return data;
};
