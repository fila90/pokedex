<template>
  <div class="pokemon-pagination">
    <router-link :to="`/?limit=${limit}&offset=${offsetPrevious}`">Previous</router-link>
    <router-link :to="`/?limit=${limit}&offset=${offsetNext}`">Next</router-link>
  </div>
</template>
<script>
export default {
  name: 'pokemon-list-pagination',
  computed: {
    limit() {
      return this.$store.state.meta.limit;
    },
    offsetPrevious() {
      const offset = this.$store.state.meta.offset - this.limit;
      if (offset <= 0) {
        return 0;
      }
      return offset;
    },
    offsetNext() {
      const { offset, count, limit } = this.$store.state.meta;
      const targetOffset = offset + limit;
      const topOffset = (Math.ceil(count / 10) * 10) - limit;
      if (targetOffset >= topOffset) {
        return topOffset;
      }
      return targetOffset;
    },
  },
};

</script>
<style lang="scss">
.pokemon-pagination {
  a {
    display: inline-block;
    margin: 0 10px;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #eee;
    outline: none;
    background: #ef5350;
    color: #fff;
  }
}
</style>
