<template>
  <Stopwatch />
</template>

<script lang="ts" setup>
import Stopwatch from "./views/Stopwatch/Stopwatch.vue";
</script>

<style>
html {
  background: #0f0f0f;
  font-size: 1.1rem;
  width: 100%;
}

#app {
  font-family: Iosevka Web, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f0f0f0;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  margin: auto;
}

h1 {
  font-size: 2.2rem;
  color: #f0c3f0;
  font-weight: bold;
}

h2 {
  color: #c28246;
  font-weight: bold;
}

p {
  text-align: justify;
}

a {
  font-weight: bold;
  color: #fff7bd;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
