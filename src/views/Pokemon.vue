<template>
  <div class="pokemon-stats">
    <div class="basic-info">
      <div>
        <h1>{{pokemon.name}}</h1>
        <img :src="pokemon.sprites && pokemon.sprites.front_default
                  || require('@/assets/unknown.png')"
             :alt="pokemon.name">
      </div>
      <div>
        <p><b>Weight: </b> {{pokemon.weight}}</p>
        <p><b>Height: </b> {{pokemon.height}}</p>
        <p><b>Experience: </b> {{pokemon.base_experience}}</p>
        <p><b>Type: </b> <span v-for="(t, i) in pokemon.types"
                :key="i">{{t.type.name}} </span></p>
      </div>
    </div>
    <div>
      <h3>Abilities</h3>
      <ul>
        <li v-for="(a, i) in pokemon.abilities"
            :key="i">{{a.ability.name}}</li>
      </ul>
    </div>
    <div>
      <h3>Stats</h3>
      <ul>
        <li v-for="(s, i) in pokemon.stats"
            :key="i">
          <p>{{s.stat.name}}</p>
          <p>Base: {{s.base_stat}}</p>
          <p>Effort: {{s.effort}}</p>
        </li>
      </ul>
    </div>
    <div class="w-100">
      <h3>Moves</h3>
      <ul>
        <li v-for="(m, i) in pokemon.moves"
            :key="i">
          <p>{{m.move.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pokemon',
  data() {
    return {
      pokemon: this.$store.state.pokemons.length ?
        this.$store.state.pokemons.find(p => p.name === this.$route.params.name) : {}
    }
  },
  beforeMount() {
    if (!this.pokemon.sprites) {
      this.$store.dispatch({
        type: 'getSinglePokemon',
        url: `https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}/`,
      })
        .then((response) => {
          if (response) {
            this.pokemon = response;
            this.$store.commit({
              type: 'toggleLoader',
              loading: false,
            });
          }
        });
    }
  },
};

</script>
<style lang="scss">
.pokemon-stats {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  text-align: left;
  text-transform: capitalize;

  >div {
    padding: 10px;
    margin: 5px;
    border: 1px solid #eee;
  }
  .basic-info {
    display: inherit;
    align-items: center;
    border: 1px solid #eee;

    div {
      padding: 10px;
      margin: 5px;
    }
  }

  ul {
    display: flex;
    flex-flow: row wrap;
    list-style: none;
    padding: 0;

    li {
      margin: 5px;
      padding: 0 10px;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;

      &:hover {
        border-color: #333;
      }
    }
  }
}
</style>
