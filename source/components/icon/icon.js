export default {
  props: ['id'],
  data() {
    return {
      iconId: `#icon-${this.id}`,
      iconClass: `icon_${this.id}`
    };
  }
};
