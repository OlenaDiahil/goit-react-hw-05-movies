import axios from 'axios';

const key = 'caae91fa03dadd61d2d243ec0631262a';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchSearchMovie = async query => {
  return await axios.get(`/search/movie`, {
    params: {
      query,
      api_key: key,
    },
  });
};

export const fetchCredits = async id => {
  return await axios.get(`/movie/${id}/credits?api_key=${key}`);
};

export const fetchTrendingMovie = async () => {
  return await axios.get(`/trending/movie/day?api_key=${key}`);
};

export const fetchMovieById = async id => {
  return await axios.get(`/movie/${id}?api_key=${key}`);
};

export const fetchMovieReview = async id => {
  return await axios.get(`/movie/${id}/reviews?api_key=${key}`);
};
