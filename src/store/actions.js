const API = 'https://pokeapi.co/api/v2';

export default {
  /**
   * @name getPokemons
   * @desc fetch list of pokemons, list is not complete it contains basic info
   * @param {Object} - params
   * @param {Number} - params.limit
   * @param {Number} - params.offset
   * @param {string} - params.url
   */
  getPokemons(context, { params }) {
    const { limit = 10, offset = 0 } = params;
    const url = `${API}/pokemon/?limit=${limit}&offset=${offset}`;

    context.commit({
      type: 'toggleLoader',
      loading: true,
    });
    return fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Error fetching pokemons ${response.status}`);
      })
      .then((response) => {
        context.commit({
          type: 'setMeta',
          count: response.count,
          limit,
          offset,
        });
        context.commit({
          type: 'setPokemons',
          pokemons: response.results,
        });
        context.commit({
          type: 'toggleLoader',
          loading: false,
        });
        context.commit({
          type: 'togglePokemonFetchedFlag',
        });
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  },
  /**
   * @name getSinglePokemon
   * @desc get detail info of single pokemon
   * @param {string} - url
   */
  getSinglePokemon(context, { url }) {
    return fetch(`${url}`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Error fetching pokemon ${response.status}`);
      })
      .then((response) => {
        context.commit({
          type: 'expandPokemon',
          pokemon: response,
        });
        return response;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  },
};
