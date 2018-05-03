export default {
  setMeta(state, payload) {
    state.meta.offset = payload.offset;
    state.meta.limit = payload.limit;
    state.meta.count = payload.count;
  },
  toggleLoader(state, payload) {
    state.loading = payload.loading;
  },
  togglePokemonFetchedFlag(state) {
    state.pokemonFetched = true;
  },
  setPokemons(state, payload) {
    state.pokemons.splice(0, state.pokemons.length, ...payload.pokemons);
  },
  /**
  * @name expandPokemon
  * @desc replace basic pokemon stats with more data
  */
  expandPokemon(state, payload) {
    const index = state.pokemons.findIndex(p => p.name === payload.pokemon.name);
    const myIndex = state.myPokemons.findIndex(p => p.name === payload.pokemon.name);
    // replace object with more info
    if (index !== -1) {
      state.pokemons.splice(index, 1, payload.pokemon);
    }

    // if reloaded from my-pokemons route,
    // state will contain bare info so it needs to be populated here
    if (myIndex !== -1) {
      state.myPokemons.splice(myIndex, 1, payload.pokemon);
    }
  },
  /**
  * @name addMyPokemon
  * @desc add to array of my pokemons, also create local storage with
  * trimmed down list so pokemons are there after refresh
  */
  addMyPokemon(state, payload) {
    const myPokemons = localStorage.myPokemons
      ? JSON.parse(localStorage.myPokemons)
      : [];
    myPokemons.push({
      id: payload.pokemon.id,
      name: payload.pokemon.name,
    });
    localStorage.myPokemons = JSON.stringify(myPokemons);

    state.myPokemons.push(payload.pokemon);
  },
  /**
  * @name removeMyPokemon
  * @desc remove pokemon from the list of my pokemons and store in local storage
  */
  removeMyPokemon(state, payload) {
    const index = state.myPokemons.findIndex(p => p.name === payload.name);
    if (index === -1) throw new Error('can\'t find this pokemon :/');

    state.myPokemons.splice(index, 1);
    const myPokemons = state.myPokemons.reduce((pre, cur) => {
      pre.push({
        id: cur.id,
        name: cur.name,
      });

      return pre;
    }, []);
    localStorage.myPokemons = JSON.stringify(myPokemons);
  },
};
