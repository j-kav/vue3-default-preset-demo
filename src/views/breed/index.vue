<template>
  <BreedFilter />
  <div v-if="isInitialLoading">
    Loading pesels...
  </div>
  <div class="pesels-grid">
    <ImageCard
        class="pesels-grid-card"
        v-for="pesel in chunkedPesels"
        :key="pesel.url"
        :url="pesel.url"
        :label="pesel.displayName"
        :isFavourite="isFavourite(pesel)"
        @toggleFavourites="toggleFavourites(pesel)"
    />
  </div>
  <div v-if="isLoading">
    Loading more pesels
  </div>
  <div v-if="hasFetchedAll">
    This is the end
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, onBeforeMount, ref, onBeforeUnmount, computed, watch } from 'vue';
import BreedFilter from '../../components/BreedFilter';
import ImageCard from '../../components/ImageCard';
import { useRoute } from 'vue-router';


export default {
  name: 'breed',
  components: {
    ImageCard,
    BreedFilter,
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      await vm.$store.dispatch('pesel/fetchAllBreeds');
    })
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const pesels = ref([]);
    const isInitialLoading = ref(true);
    const isLoading = ref(true);
    const currentPage = ref(0);
    const totalPages = ref();
    const limit = 20;

    const hasFetchedAll = computed(() => {
      return currentPage.value === totalPages.value && !isLoading.value
    });

    const handleScroll = async () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (hasFetchedAll.value || isLoading.value) {
          return;
        }
        isLoading.value = true;

        const from = currentPage.value * limit;
        const peselsChunck = store.state.pesel.breedAllImages.slice(from, from + limit);

        pesels.value = [
          ...pesels.value,
          ...peselsChunck,
        ];
        isLoading.value = false;
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    });

    const fetchBreedImages = async () => {
      console.assert(route.params.breedId, 'route param breedId must be present');
      await store.dispatch('pesel/fetchAllBreedImages', { breedId: route.params.breedId });

      totalPages.value = store.state.pesel.breedAllImages.length;
      pesels.value = store.state.pesel.breedAllImages.slice(0, limit);

      isInitialLoading.value = false;
      isLoading.value = false;
    }

    watch(() => route.params.breedId, () => {
      currentPage.value = 0;
      fetchBreedImages();
    });

    onBeforeMount( () => {
      currentPage.value++
      fetchBreedImages();
    });

    return {
      chunkedPesels: pesels,
      toggleFavourites: (pesel) => store.dispatch('peselFavourites/toggleFavourites', { pesel }),
      isFavourite: (pesel) => store.state.peselFavourites.favourites.includes(pesel),
      isInitialLoading,
      isLoading,
      hasFetchedAll,
      fetchBreedImages
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

 .pesels-grid-card:first-child {
   grid-column-start: 1;
   grid-column-end: 4;
   grid-row-start: 1;
   grid-row-end: 3;
 }
</style>