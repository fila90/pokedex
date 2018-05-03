<template>
  <div>
    <ul class="pokemon-list">
      <pokemon-list-item v-for="pokemon in $store.state.myPokemons"
                         :key="pokemon.name"
                         :pokemon="pokemon"></pokemon-list-item>
    </ul>
    <div class="stats" v-if="$store.state.myPokemons.length">
      <h2>Average Height: {{this.averageHeight / $store.state.myPokemons.length}}</h2>
      <h2>Average Weight: {{this.averageWeight / $store.state.myPokemons.length}}</h2>
      <h2>Types:
        <p v-for="(type, key) in averageTypes" :key="key">{{key}}: {{type}}</p>
      </h2>
    </div>
  </div>
</template>
<script>
import PokemonListItem from '@/components/Pokemon_List_Item.vue';

export default {
  name: 'my-pokemons',
  components: {
    PokemonListItem,
  },
  computed: {
    averageHeight() {
      const height = this.$store.state.myPokemons.reduce((pre, cur) => {
        if (!cur.height) return pre;
        return pre + cur.height;
      }, 0);
      return height;
    },
    averageWeight() {
      const weight = this.$store.state.myPokemons.reduce((pre, cur) => {
        if (!cur.height) return pre;
        return pre + cur.weight;
      }, 0);
      return weight;
    },
    averageTypes() {
      return this.$store.state.myPokemons.reduce((pre, cur) => {
        if (!cur.types) return pre;

        cur.types.forEach((t) => {
          if (!pre[t.type.name]) {
            pre[t.type.name] = 1;
          } else {
            pre[t.type.name] += 1;
          }
        });
        return pre;
      }, {});
    },
  },
  beforeMount() {
    this.$store.state.myPokemons.forEach((p) => {
      if (p.sprites) return;
      this.$store.dispatch({
        type: 'getSinglePokemon',
        url: `https://pokeapi.co/api/v2/pokemon/${p.name}/`,
      })
        .then((response) => {
          if (response) {
            this.$store.commit({
              type: 'toggleLoader',
              loading: false,
            });
          }
        });
    });
  },
};

</script>
<style lang="scss">
.stats {
  padding: 10px;
  text-align: left;
  text-transform: capitalize;
  p {
    margin-left: 20px;
  }
}
</style>
