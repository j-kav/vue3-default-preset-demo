<template>
  <div class="image-card" :style="backgroundStyles(url)">
    <img class="add-favourite"
         :src="favouritesImage(isFavourite)"
         @click="$emit('toggleFavourites', url)"
         alt="add to favourite">
    <div class="image-card-label" v-if="label">{{label}}</div>
    <div class="foreground-gradient"></div>
  </div>
</template>

<script>

export default {
  name: 'ImageCard',
  props: ['url', 'isFavourite', 'label'],
  methods: {
    backgroundStyles(url) {
      return {
        'background-image': `url(${url})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'center'
      }
    },
    favouritesImage(isFavourite) {
      return isFavourite ? require('@/assets/fav-icon-active.svg') : require('@/assets/fav-icon.svg');
    }
  }
}
</script>

<style scoped>
  .image-card {
    position: relative;
    margin: 10px;
    overflow: hidden;
    border-radius: 8px;
  }

  .add-favourite {
    position: absolute;
    left: 25px;
    top: 25px;
    cursor: pointer;
    z-index: 2;
  }

  .foreground-gradient {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: linear-gradient(1.26deg, #000000 -5.53%, rgba(0, 0, 0, 0) 54.45%);
  }

  .image-card-label {
    position: absolute;
    bottom: 25px;
    left: 0;
    right: 25px;
    text-align: right;
    color: white;
    font-size: 25px;
    z-index: 3;
  }


</style>