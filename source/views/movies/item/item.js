import {mapGetters, mapActions} from 'vuex';
import urls from 'global.js';
import icon from 'components/icon/icon.vue';
import preloader from 'components/preloader/preloader.vue';
import {VueAutosuggest} from 'vue-autosuggest';

export default {
  name: 'item',

  components: {
    icon,
    preloader,
    VueAutosuggest
  },

  props: [
    'entry',
    'mode'
  ],

  watch: {
    entry: function () {
      this.resetItem();
      this.setCast();
    },

    getCast: function () {
      this.setCast();
    }
  },

  mounted: function () {
    this.resetItem();
    this.setCast();
  },

  data() {
    return {
      alias: 'movie',
      item: {},
      cast: [],
      fullCast: false
    };
  },

  computed: {
    ...mapGetters([
      'getGenres',
      'isGenresOK',
      'getCast',
      'isMobile'
    ]),

    base: function () {
      return urls.img;
    },

    isEntryOK: function () {
      return typeof (this.entry.id) !== 'undefined';
    },

    limitedCast: function () {
      return this.cast.slice(0, 5);
    }
  },

  methods: {
    ...mapActions([
      'fetchCast'
    ]),

    setCast: function () {
      this.fullCast = false;

      if (typeof (this.getCast(this.entry.id)) === 'undefined') {
        this.cast = [];
        this.fetchCast(this.entry.id).then(() => {
          this.cast = this.getCast(this.entry.id);
        });
      } else {
        this.cast = this.getCast(this.entry.id);
      }
    },

    getItemByID: function (list, id) {
      return list.find(item => parseInt(item.id, 10) === parseInt(id, 10));
    },

    resetItem: function () {
      this.item = JSON.parse(JSON.stringify(this.entry));
    },

    fetchItem: function () {
      this.$emit('nodata', this.item.id);
    },

    close: function () {
      this.resetItem();
      this.$emit('close');
    },

    hookItemEnter(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: 0});
      tl.set(el, {y: 60}, '0.6');
      tl.to(el, .6, {y: 0, opacity: 1, clearProps: 'all', ease: Sine.ease}, '0.6');
    },

    hookItemLeave(el, done) {
      const tl = new TimelineLite({onComplete: done});

      tl.set(el, {opacity: 1});
      tl.set(el, {y: 0}, '0.6');
      tl.to(el, .6, {y: -60, opacity: 0, clearProps: 'all', ease: Sine.ease}, '0.6');
    }
  }
};
