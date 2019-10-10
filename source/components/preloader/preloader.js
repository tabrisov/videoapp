import icon from 'components/icon/icon.vue';

export default {
  name: 'preloader',

  props: [
    'title',
    'fetch',
    'ok',
    'error'
  ],

  components: {
    icon
  },

  created: function () {
    this.fetch();
  }
};
