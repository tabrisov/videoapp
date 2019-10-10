import config from 'config';

const urls = {
  base: config.base,
  img: config.img,
  movies: config.api + 'discover/movie',
  movie: config.api + 'movie/',
  genres: config.api + 'genre/movie/list'
};

export default urls;
