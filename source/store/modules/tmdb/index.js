import Vue from 'vue';
import * as types from '../../mutation-types';
import urls from 'global.js';

export default {
  state: {
    movies: {
      list: [],
      isLoaded: false,
      isError: false
    },
    genres: {
      list: [],
      isLoaded: false,
      isError: false
    },
    cast: {}
  },

  mutations: {
    [types.RETRIEVE_MOVIES](state, {list}) {
      state.movies.list = list;
    },

    [types.RETRIEVE_GENRES](state, {list}) {
      state.genres.list = list;
    },

    setStatus(state, payload) {
      state[payload.object][payload.key] = payload.value;
    },

    setCast(state, payload) {
      state.cast[payload.movieID] = payload.cast;
    }
  },

  getters: {
    getMovies: state => {
      return state.movies.list;
    },

    getGenres: state => {
      return state.genres.list;
    },

    isLibraryOK: state => {
      return state.movies.isLoaded
        && state.genres.isLoaded;
    },

    isMoviesOK: state => {
      return state.movies.isLoaded;
    },

    isGenresOK: state => {
      return state.genres.isLoaded;
    },

    isMoviesError: state => {
      return state.movies.isError;
    },

    isGenresError: state => {
      return state.genres.isError;
    },

    getCast: state => movieID => {
      return state.cast[movieID];
    },

    isCastOK: state => movieID => {
      return typeof (state.cast[movieID]) !== 'undefined';
    }
  },

  actions: {
    fetchGenres({commit}) {
      const url = urls.genres;
      commit('setStatus', {object: 'genres', key: 'isError', value: false});

      Vue.http.get(url)
        .then(response => {
          const list = response.body.genres;

          commit(types.RETRIEVE_GENRES, {list});
          commit('setStatus', {object: 'genres', key: 'isLoaded', value: true});
        }, response => {
          if (response.status === 0) {response.statusText = 'Запрос отклонён';}
          commit('setStatus', {object: 'genres', key: 'isError', value: response.statusText});
        }
        );
    },

    async fetchMovies({commit}, genreID) {
      return new Promise(function (resolve, reject) {
        setTimeout(async () => {
          let url = urls.movies;

          if (genreID) {
            url = url + '?with_genres=' + genreID;
          } else {
            url += '?sort_by=popularity.desc';
          }

          commit('setStatus', {object: 'movies', key: 'isError', value: false});

          Vue.http.get(url)
            .then(response => {
              const list = response.body.results;

              commit(types.RETRIEVE_MOVIES, {list});
              commit('setStatus', {object: 'movies', key: 'isLoaded', value: true});
              resolve();
            }, response => {
              if (response.status === 0) {response.statusText = 'Запрос отклонён';}
              commit('setStatus', {object: 'movies', key: 'isError', value: response.statusText});
              reject();
            }
            );

        }, 30);
      });
    },

    async fetchCast({commit}, movieID) {
      return new Promise(function (resolve, reject) {
        setTimeout(async () => {
          const url = urls.movie + movieID + '/credits';

          Vue.http.get(url)
            .then(response => {
              commit('setCast', {movieID: movieID, cast: response.body.cast});
              resolve();
            }, response => {
              if (response.status === 0) {response.statusText = 'Запрос отклонён';}
              reject();
            }
            );
        }, 30);
      });
    }
  }
};
