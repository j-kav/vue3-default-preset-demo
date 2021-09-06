<template>
  <div class="breed-filter">
    <div class="breed-filter-top">
      <div>
        <span @click="toggleExpand" class="breed-filter-expand-button">Breeds</span>
        <span v-if="selectedBreedId" class="breed-filter-selected-badge">{{normalizedSelectedBreedId(selectedBreedId)}}</span>
      </div>


    </div>
    <div class="breed-filter-breeds" :class="{ 'breed-filter-breeds--expanded': isExpanded}">
          <span v-for="breed in breeds"
                class="breed-filter-badge"
                @click="toggleSelectedBreedId(breed.id)"
                :key="breed.id">
      {{ breed.displayName }}
    </span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'BreedFilter',
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      await vm.$store.dispatch('pesel/fetchAllBreeds');
    })
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isExpanded = ref(false);

    return {
      selectedBreedId: computed(() => route.params.breedId),
      breeds: computed(() => store.state.pesel.breeds),
      toggleSelectedBreedId: (breedId) => {
        isExpanded.value = !isExpanded.value;
        router.push({ name: 'breed', params: { breedId } });
      },
      isExpanded,
      toggleExpand:  () => { isExpanded.value = !isExpanded.value },
      normalizedSelectedBreedId: (breedId) => store.state.pesel.breeds.find((breed) => breed.id === breedId)?.displayName ?? breedId
    }
  }
}
</script>

<style>
 .breed-filter {
   background-color: #151419;
 }

 .breed-filter-badge {
   background-color: #151419;
   color: #626262;
   display: inline-block;
   border: 1px solid #626262;
   border-radius: 20px;
   padding: 5px 10px;
   margin-right: 10px;
   margin-bottom: 5px;
   user-select: none;
   cursor: pointer;
 }

 .breed-filter-badge:hover {
   background-color: rgba(21, 20, 25, 0.65);
 }

 .breed-filter-selected-badge {
   background-color: #151419;
   color: #3C59F0;
   display: inline-block;
   border: 1px solid #3C59F0;
   border-radius: 20px;
   padding: 5px 10px;
   margin-right: 10px;
   margin-bottom: 5px;
   user-select: none;
 }

 .breed-filter-breeds {
   overflow: hidden;
   height: 0;
   transition: height 300ms ease 0ms;
 }

 .breed-filter-breeds--expanded {
   height: auto;
 }

 .breed-filter-expand-button {
   color: white;
   border-bottom: 1px dotted white;
   cursor: pointer;
   user-select: none;
   margin-right: 10px;
 }

 .breed-filter-top {
   margin-bottom: 10px;
   display: flex;
   justify-content: space-between;
   padding-left: 20px;
   padding-right: 20px;
 }
</style>