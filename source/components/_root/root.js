import {mapGetters, mapActions, mapMutations} from 'vuex';

import calcFontBase from 'helpers/calcFontSizer';
import preloader from 'components/preloader/preloader.vue';

export default {

  components: {
    preloader
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapGetters([
      'appIsReady',
      'dataIsFetched',
      'isMobile',
      'getUiColor',

      'isMoviesOK',
      'isMoviesError',
      'isGenresOK',
      'isGenresError'
    ])
  },

  watch: {
    /* Когда все данные загрузятся, обновить страницу */
    dataIsFetched: function () {
      this.$router.push(this.$route.fullPath);
    }
  },

  mounted: function () {
    calcFontBase.update();
    this.setDeviceType();

    window.addEventListener('resize', () => {
      calcFontBase.update();
      this.setDeviceType();
    });

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        this.setAppReady(true);
      }, 300);
    });

    window.onload = () => {
      this.setAppLoaded(true);
    };
  },

  methods: {
    ...mapMutations([
      'setAppReady',
      'setAppLoaded',
      'setCurrentWidth'
    ]),

    ...mapActions([
      'fetchMovies',
      'fetchGenres'
    ]),

    setDeviceType: function () {
      const scrollWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
      );

      this.setCurrentWidth(scrollWidth);
    },

    /*
     * Анимация главного экрана
     */
    hookAppEnter(el, done) {
      const tl = new TimelineLite({onComplete: done});

      const navbar = el.querySelector('.navbar');

      tl.set(el, {opacity: 0});
      if (navbar) {
        tl.set(navbar, {opacity: 0, y: -80});
      }

      tl.to(el, .4, {opacity: '1', clearProps: 'all', ease: Sine.easeOut}, '+=.6');
      if (navbar) {
        tl.to(navbar, .4, {opacity: 1, y: 0, clearProps: 'transform'}, '-=0.4');
      }
    },

    /*
     * Анимация появления контента
     */
    hookViewEnter(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: 0});
      tl.set(el, {y: 60}, '0.6');
      tl.to(el, .6, {y: 0, opacity: 1, clearProps: 'all', ease: Sine.ease}, '0.6');
    },

    hookViewLeave(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: 1});
      tl.to(el, .4, {opacity: 0});
    }
  }
};
