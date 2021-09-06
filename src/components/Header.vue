<template>
  <header class="header">
    <router-link to="/" class="header-brand">PESEL</router-link>
    <router-link to="/favourites" class="header-favourites">
      Favourites
      <img :src="require('@/assets/small-fav-icon.svg')" alt="fav">
    </router-link>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  .header {
    top:0;
    left:0;
    right:0;
    position: fixed;
    height: 100px;
    background-color: #151419;
    box-shadow: 0 8px 16px 0 #0000008C;
    z-index: 10;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 25px;
    padding-right: 25px;
  }

  .header-brand {
    color: #3C59F0;
    font-size: 32px;
    font-weight: 700;
  }

  .header-favourites {
    color: #626262;
    text-decoration: none;
    vertical-align: baseline;
  }

  .header-favourites.router-link-active img,
  .header-favourites.router-link-active {
    color: white;
  }

  .header-favourites img {
    vertical-align: baseline;
  }

</style>