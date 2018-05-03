<template>
  <li class="pokemon">
    <div class="actions">
      <button type="button"
              class="pokeball"
              :title="favorites ? 'Release into the wilderness.' : 'Catch!'"
              :class="{'closed': favorites}"
              @click="toggleAddToMyPokemons"></button>
    </div>
    <router-link :to="`pokemon/${pokemon.name}`">
      <img :src="pokemon.sprites && pokemon.sprites.front_default
          || require('@/assets/unknown.png')"
           :alt="pokemon.name">
      <h2>{{pokemon.name}}</h2>
    </router-link>
  </li>
</template>
<script>
export default {
  name: 'pokemon-list-item',
  props: ['pokemon'],
  beforeMount() {
    if (this.pokemon.id) return;
    this.$store.dispatch({
      type: 'getSinglePokemon',
      url: `https://pokeapi.co/api/v2/pokemon/${this.pokemon.name}/`,
    });
  },
  methods: {
    toggleAddToMyPokemons() {
      if (this.favorites) {
        this.$store.commit({
          type: 'removeMyPokemon',
          name: this.pokemon.name,
        });
      } else {
        this.$store.commit({
          type: 'addMyPokemon',
          pokemon: this.pokemon,
        });
      }
    },
  },
  computed: {
    favorites() {
      return !!this.$store.state.myPokemons.find(p => p.name === this.pokemon.name);
    },
  },
};

</script>
<style lang="scss">
.pokemon {
  position: relative;
  display: inline-block;
  border: 1px solid #eee;
  padding: 20px;
  text-align: center;
  flex: 1;
  will-change: box-shadow;

  &:hover {
    box-shadow: 0px 2px 5px #333;
    transition: box-shadow 0.35s ease;
  }

  .actions {
    position: absolute;
    right: 10px;
    top: 10px;

    .pokeball {
      width: 30px;
      height: 30px;
      padding: 0;
      cursor: pointer;
      border: none;
      outline: none;
      background: transparent url('../assets/pokeball_open.png') center no-repeat;
      background-size: contain;

      &.closed {
        background: transparent url('../assets/pokeball.png') center no-repeat;
        background-size: contain;
      }
    }
  }

  img {
    display: block;
    margin: auto;
  }
}
</style>
