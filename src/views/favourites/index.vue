<template>
  <div class="grid">
    <template v-if="chunkedDogImages.length > 0">
      <ImageCard
          v-for="dogImage in chunkedDogImages"
          :key="dogImage.url"
          :url="dogImage.url"
          :label="dogImage.displayName"
          :isFavourite="isFavourite(dogImage)"
          @toggleFavourites="toggleFavourites(dogImage)"
      />
    </template>
    <div v-else class="no-favorites">There are no favorites yet</div>
  </div>
  <div v-if="hasShowedAll">
    This is the end
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, onBeforeMount, ref, onBeforeUnmount, computed } from 'vue';
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

    const dogFavouriteImages = ref(store.state.dogsFavourites.favourites);

    const hasShowedAll = computed(() => {
      return currentPage.value === totalPages.value
    });

    const handleScroll = async () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (hasShowedAll.value) {
          return;
        }
        const from = currentPage.value * limit;
        const dogImagesChunk = dogFavouriteImages.value.slice(from, from + limit);
        dogFavouriteImages.value = [
          ...dogFavouriteImages.value,
          ...dogImagesChunk,
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
      totalPages.value = dogFavouriteImages.value.length;
      dogFavouriteImages.value = dogFavouriteImages.value.slice(0, limit);
    });

    return {
      chunkedDogImages: dogFavouriteImages,
      toggleFavourites: (dog) => store.dispatch('dogsFavourites/toggleFavourites', { dog }),
      isFavourite: (dog) => store.state.dogsFavourites.favourites.includes(dog),
      hasShowedAll
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

.no-favorites {
  text-align: center;
}
</style>