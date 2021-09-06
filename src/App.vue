<template>
  <Header/>
  <main class="main-layout">
    <router-view></router-view>
  </main>
  <ScrollTop/>
</template>

<script>

import Header from './components/Header';
import ScrollTop from './components/ScrollTop';

export default {
  name: 'App',
  components: {
    Header,
    ScrollTop
  }
}
</script>

<style>
:root {
  background-color: #151419;
}

#app {
  font-family: 'IBM Plex Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-layout {
  margin-top: 120px;
}
</style>
