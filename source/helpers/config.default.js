import localConfig from 'localConfig';

const resultConfig = {};
const defaultConfig = {
  base: '//movies.app/',
  img: 'images.movies.app',
  api: '//api.movies.app/'
};

Object.assign(resultConfig, defaultConfig, localConfig);

export default resultConfig;
