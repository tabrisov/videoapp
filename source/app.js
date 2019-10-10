/* eslint-disable no-unused-vars */
import Vue from 'vue';
import {includes} from 'lodash';
import {sync} from 'vuex-router-sync'; // eslint-disable-line
import VueResource from 'vue-resource';
import store from './store';
import router from './router';
import {setMeta} from 'helpers/meta';
import config from 'config';
import {TweenMax} from 'gsap'; // eslint-disable-line
import VueVirtualScroller from 'vue-virtual-scroller';
import App from './components/_root/root.vue';

const __svg__ = {path: './assets/images/sprite/*.svg', name: '[hash].logos.svg'}; // eslint-disable-line
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

Vue.use(VueVirtualScroller);
Vue.use(VueResource);

const moment = require('moment');
Vue.use(require('vue-moment'), {moment});

Vue.url.options.root = '/api/';

if (NODE_ENV === 'production') {
  Vue.config.silent = true;
  Vue.config.devtools = false;
}

Vue.http.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzY4NWFmNThkODliMTEyMTE2MGY5MjQ5ODUzNTlkMyIsInN1YiI6IjVkOWQ3MjQ0YTUwNDZlMDAzNjgzM2I2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6l9BCEZeZRow1CxP9mN8euLBtR2-wpR41k04GQY9UnM';

const app = new Vue(Vue.util.extend({
  router,
  store
}, App));

app.$mount('#app');

export {app, router, store};
