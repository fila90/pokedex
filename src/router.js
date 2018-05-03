import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyPokemons from './views/MyPokemons.vue';
import Pokemon from './views/Pokemon.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/my-pokemons',
    name: 'my pokemons',
    component: MyPokemons,
  },
  {
    path: '/pokemon/:name',
    name: 'pokemon',
    component: Pokemon,
  },
  ],
});
