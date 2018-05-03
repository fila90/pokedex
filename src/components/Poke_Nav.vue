<template>
  <nav class="pokenav">
    <ul>
      <li>
        <router-link :to="`/?limit=${$store.state.meta.limit || 0}&offset=${$store.state.meta.offset || 0}`">
          Home
        </router-link>
      </li>
      <li>
        <router-link to="/my-pokemons">
          My Pokemons ({{$store.state.myPokemons.length}})
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<style lang="scss">
.pokenav {
  padding: 10px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 2px #eee;
  ul {
    list-style: none;
    display: flex;
    flex-flow: row nowprap;
  }
  li {
    flex: 1;
  }
  a {
    text-decoration: none;
    &.router-link-active {
      color: #ef5350;
      font-weight: bold;
    }
  }
}
</style>
