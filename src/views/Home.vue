<template>
  <div>
    <ul class="pokemon-list">
      <pokemon-list-item v-for="pokemon in $store.state.pokemons"
                         :key="pokemon.name"
                         :pokemon="pokemon"></pokemon-list-item>
    </ul>
    <pokemon-list-pagination></pokemon-list-pagination>
  </div>
</template>

<script>
import PokemonListItem from '@/components/Pokemon_List_Item.vue';
import PokemonListPagination from '@/components/Pokemon_List_Pagination.vue';

export default {
  name: 'home',
  components: {
    PokemonListItem,
    PokemonListPagination,
  },
  beforeMount() {
    if (!this.$store.state.pokemonFetched) {
      this.$store.dispatch({
        type: 'getPokemons',
        params: {
          limit: Number(this.$route.query.limit) || 10,
          offset: Number(this.$route.query.offset) || 0,
        },
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch({
      type: 'getPokemons',
      params: {
        limit: Number(to.query.limit) || 10,
        offset: Number(to.query.offset) || 0,
      },
    });
    next();
  },
};
</script>
