import {mapGetters, mapActions} from 'vuex';
import {setMeta} from 'helpers/meta';
import urls from 'global.js';
import icon from 'components/icon/icon.vue';
import preloader from 'components/preloader/preloader.vue';
import item from '../item/item.vue';

export default {
  name: 'movies',

  components: {
    icon,
    preloader,
    item
  },

  props: [
    'id',
    'genreID'
  ],

  data() {
    return {
      meta: {
        title: 'Movies'
      },
      alias: 'movies',
      entry: {},
      error: null,
      targetID: null,
      search: null,
      results: []
    };
  },

  computed: {
    ...mapGetters({
      list: 'getMovies',
      isMoviesOK: 'isMoviesOK',
      genres: 'getGenres',
      isGenresOK: 'isGenresOK',
      getCast: 'getCast',
      isCastOK: 'isCastOK'
    }),

    base: function () {
      return urls.img;
    },

    isEntryOK: function () {
      return !!this.entry && typeof (this.entry.id) !== 'undefined';
    },

    cast: function () {
      return this.getCast(this.entry.id);
    }
  },

  created: function () {
    setMeta(this.meta);

    // with genreID
    if (typeof (this.genreID) !== 'undefined' ) {
      this.fetchMovies(this.genreID);
    } else {
      this.fetchMovies();
    }

    // with movieID
    if (typeof (this.id) !== 'undefined' ) {
      this.targetID = parseInt(this.id, 10);
      const index = this.list.findIndex(obj => obj.id === this.targetID);
      this.entry = this.list[index];

      this.fetchCast(this.targetID);
    }
    this.results = this.list;
  },

  methods: {
    ...mapActions([
      'fetchMovies',
      'fetchCast'
    ]),

    getItemByID: function (list, id) {
      return list.find(li => parseInt(li.id, 10) === parseInt(id, 10));
    },

    resetState: function () {
      this.entry = {};
      this.targetID = null;
      this.victim = null;
      history.pushState(null, null, `/${this.alias}`);
    },

    openGenre: function (id) {
      this.fetchMovies(id);
    },

    fetchEntry: function (id) {
      console.log('@todo: Загрузить данные для id = ' + id + ' и передать их в компонент');
    },

    /*
     *  Выбрать элемент для просмотра
     */
    previewEntry: function (id) {
      const index = this.list.findIndex(obj => obj.id === id);
      this.targetID = id;
      this.entry = this.list[index];
      history.pushState(null, null, `/${this.alias}/${this.list[index].id}`);

      if (!this.isCastOK(id)) {
        this.fetchCast(id);
      }
    },

    /*
     *  Закрыть панель
     */
    closeEntry: function () {
      this.entry = {};
      history.pushState(null, null, `/${this.alias}`);
    },

    /*
     *  Строка поиска
     */
    filterResults: function () {
      this.results = this.list.filter(entry => {
        return entry.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },

    clearFilters: function () {
      this.search = '';
      this.filterResults();
    }
  }
};
