import Vue from 'vue';
import Router from 'vue-router';

import frontpage from 'views/frontpage/frontpage.vue';
import movies from 'views/movies/list/list.vue';
import notFound from 'views/notfound/notfound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/movies',
      components: {
        default: movies
      },
      props: {
        default: true
      },
      children: [
        {
          path: '/',
          name: 'movies',
          component: movies
        },
        {
          path: ':id',
          name: 'movie',
          component: movies
        },
        {
          path: 'genre/:genreID',
          name: 'genre',
          component: movies
        }
      ]
    },

    {
      path: '/404',
      name: 'Not Found',
      components: {
        default: notFound
      }
    },

    {
      path: '/',
      name: 'Home',
      components: {
        default: frontpage
      },
      props: {
        default: true
      },
      redirect: 'movies'
    },

    {
      path: '*',
      redirect: '/404'
    }
  ]
});
