<template>
  <div id="app">
    <poke-nav></poke-nav>
    <router-view/>
    <div class="loader"
         v-if="$store.state.loading">
      <h1>Loading...</h1>
    </div>
  </div>
</template>
<script>
import pokeNav from '@/components/Poke_Nav.vue';

export default {
  name: 'app',
  components: {
    pokeNav,
  },
};

</script>
<style lang="scss">
* {
  box-sizing: border-box;
  color: #2c3e50;
}

html,
body {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

a {
  text-decoration: none
}

.hiddex-xs {
  display: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.pokemon-list {
  padding: 0 10px;
  display: grid;
  grid-gap: 10px;
  justify-items: stretch;
  justify-content: stretch;
  align-items: center;
  align-content: start;
  grid-template: auto / 1fr;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.75) url('./assets/loader.gif') center no-repeat;
  backgorund-size: contain;
}

// HELPERS
.w-100 {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .hiddex-xs {
    display: unset;
  }
  .pokemon-list {
    grid-template: auto / 1fr 1fr;
  }
}

@media screen and (min-width: 992px) {
  .pokemon-list {
    grid-template: auto / 1fr 1fr 1fr;
  }
}

@media screen and (min-width: 1200px) {
  .pokemon-list {
    grid-template: auto / 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>
