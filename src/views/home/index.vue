<template>
  <BreedFilter />
  <div v-if="isInitialLoading">
    Loading dog images...
  </div>
  <div class="grid">
    <ImageCard
        class="grid-card"
        v-for="dogImage in chunkedDogImages"
        :key="dogImage.url"
        :url="dogImage.url"
        :label="dogImage.displayName"
        :isFavourite="isFavourite(dogImage)"
        @toggleFavourites="toggleFavourites(dogImage)"
    />
  </div>
  <div v-if="isLoading">
    Loading more dog images
  </div>
  <div v-if="hasFetchedAll">
    This is the end
  </div>
</template>

<script>
import { useStore } from 'vuex'
import {onMounted, onBeforeMount, ref, onBeforeUnmount, computed, watch } from 'vue';
import BreedFilter from '../../components/BreedFilter';
import ImageCard from '../../components/ImageCard';

export default {
  name: 'home',
  components: {
    ImageCard,
    BreedFilter,
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      await vm.$store.dispatch('dogs/fetchAllBreeds');
    });
  },
  setup() {
    const store = useStore();
    const dogImages = ref([]);
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
        const dogImagesChunk = store.state.dogs.shuffledBreedImages.slice(from, from + limit);

        dogImages.value = [
          ...dogImages.value,
          ...dogImagesChunk,
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
      await store.dispatch('dogs/fetchShuffledBreedImages');

      totalPages.value = store.state.dogs.shuffledBreedImages.length;
      dogImages.value = store.state.dogs.shuffledBreedImages.slice(0, limit);

      isInitialLoading.value = false;
      isLoading.value = false;
    }

    watch(() => store.state.dogs.breeds, () => {
      currentPage.value++;
      fetchBreedImages();
    });

    onBeforeMount( () => {
      currentPage.value++
      fetchBreedImages();
    });

    return {
      chunkedDogImages: dogImages,
      toggleFavourites: (dog) => store.dispatch('dogsFavourites/toggleFavourites', { dog }),
      isFavourite: (dog) => store.state.dogsFavourites.favourites.includes(dog),
      isInitialLoading,
      isLoading,
      hasFetchedAll,
    }
  }
}
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 290px;
}

.grid-card:first-child {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}
</style>