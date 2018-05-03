export default {
  loading: true,
  pokemonFetched: false,
  meta: {
    limit: 10,
    offset: 0,
    count: 0,
  },
  pokemons: [],
  myPokemons: localStorage.myPokemons
    ? JSON.parse(localStorage.myPokemons)
    : [],
};
