import Vue from 'vue';
import Vuex from 'vuex';

import tmdb from './modules/tmdb';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
    common: {
      data: null
    },
    ui: {
      uiColor: 'white',
      menuIsOpen: false
    },
    currentWidth: 1000,
    app: {
      loaded: null,
      ready: null,
      config: {
        loaded: null
      },
      fetched: false
    }
  },

  mutations: {
    setAppReady(state, payload) {
      state.app.ready = payload;
    },
    setAppLoaded(state, payload) {
      state.app.loaded = payload;
    },
    setCurrentWidth(state, device) {
      state.currentWidth = device;
    },
    setUiColor(state, payload) {
      state.ui.uiColor = payload;
    },
    setCommonData(state, payload) {
      state.common.data = payload;
    }
  },

  getters: {
    appIsLoaded: state => {
      return state.app.loaded;
    },
    appIsReady: state => {
      return state.app.ready;
    },
    configIsLoaded: state => {
      return state.app.config.loaded;
    },
    dataIsFetched: (state, getters) => {
      return (getters.isMoviesOK);
    },
    isMobile: state => {
      return state.currentWidth <= 980;
    },
    isNarrow: state => {
      return state.currentWidth < 1280;
    },
    menuIsOpen: state => {
      return state.ui.menuIsOpen;
    },
    getCurrentWidth: state => {
      return state.currentWidth;
    },
    getUiColor: state => {
      return state.ui.uiColor;
    },
    getCommonData: state => {
      return state.common.data;
    }
  },

  modules: {
    tmdb
  },
  strict: debug
});

export default store;
