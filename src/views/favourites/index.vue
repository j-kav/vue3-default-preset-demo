<template>
  <div class="pesels-grid">
    <ImageCard
        v-for="pesel in chunkedPesels"
        :key="pesel.url"
        :url="pesel.url"
        :label="pesel.displayName"
        :isFavourite="isFavourite(pesel)"
        @toggleFavourites="toggleFavourites(pesel)"
    />
  </div>
  <div v-if="hasShowedAll">
    This is the end
  </div>
</template>

<script>
import { useStore } from 'vuex'
import {onMounted, onBeforeMount, ref, onBeforeUnmount, computed } from 'vue';
import ImageCard from '../../components/ImageCard';

export default {
  name: 'Favourites',
  components: {
    ImageCard
  },
  setup() {
    const store = useStore();
    const currentPage = ref(0);
    const totalPages = ref();
    const limit = 20;

    const pesels = ref(store.state.peselFavourites.favourites);

    const hasShowedAll = computed(() => {
      return currentPage.value === totalPages.value
    });

    const handleScroll = async () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (hasShowedAll.value) {
          return;
        }
        const from = currentPage.value * limit;
        const peselsChunck = pesels.value.slice(from, from + limit);
        pesels.value = [
          ...pesels.value,
          ...peselsChunck,
        ];
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    });

    onBeforeMount( () => {
      currentPage.value++
      totalPages.value = pesels.value.length;
      pesels.value = pesels.value.slice(0, limit);
    });

    return {
      chunkedPesels: pesels,
      toggleFavourites: (pesel) => store.dispatch('peselFavourites/toggleFavourites', { pesel }),
      isFavourite: (pesel) => store.state.peselFavourites.favourites.includes(pesel),
      hasShowedAll
    }
  }
}
</script>

<style>
.pesels-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 290px;
}
</style>