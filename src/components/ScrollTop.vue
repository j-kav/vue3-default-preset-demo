<template>
    <img
        class="scroll-top-icon"
        :src="require('@/assets/scroll-top-icon.svg')"
        @click="scrollTop"
        alt=""
    >
</template>

<script>
export default {
  name: 'ScrollTop',
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>
  .scroll-top-icon {
    right: 30px;
    bottom: 30px;
    position: fixed;
    z-index: 4;
    cursor: pointer;
  }

</style>