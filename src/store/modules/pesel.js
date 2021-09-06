import * as peselService from '../../services/peselService';
import shuffle from "../../utils/array/shuffle";

const pesel = {
    namespaced: true,
    state: () => ({
        error: null,
        breeds: [],
        breedAllImages: [],
        shuffledBreedImages: [],
    }),
    mutations: {
        breeds (state, payload) {
            state.breeds = payload;
        },
        error (state, payload) {
            state.error = payload;
        },
        breedAllImages (state, payload) {
            state.breedAllImages = payload;
        },
        concatBreedAllImages (state, payload) {
            state.breedAllImages = state.breedAllImages.concat(payload)
        },
        shuffledBreedImages (state, payload) {
            state.shuffledBreedImages = payload;
        },
    },
    getters: {
        breeds (state) {
            return state.breeds;
        },
        breedAllImages (state) {
            return state.breedAllImages;
        }
    },
    actions: {
        async fetchAllBreeds ({ commit, state }) {
            if (state.breeds.length > 0) {
                return; // all breeds have already been fetched.
            }

            const [error, breeds] = await peselService.fetchAllBreeds();

            if (error) {
                commit('error', error)
            } else {
                commit('breeds', breeds)
            }
        },
        async fetchAllBreedImages ({ commit }, { breedId }) {
           const [error, breedImages] = await peselService.fetchAllBreedImages(breedId);

            if (error) {
                commit('error', error)
            } else {
                commit('concatBreedAllImages', breedImages);
            }
        },
        async fetchShuffledBreedImages ({ commit, state }) {
           const result = await Promise.all(
                state.breeds
                    // fetch 3 of every breeds
                    .map((breed) => peselService.fetchShuffledBreedImages(breed.id, 3))
            ).catch((error) => {
               commit('error', error);
           });

            const mappingResult = result.flatMap(([error, breedImages]) => {
                if (error) {
                    commit('error', error);
                } else if (breedImages.length) {
                    return breedImages;
                }
                return [];
            });

            // randomize result
            shuffle(mappingResult);
            commit('shuffledBreedImages', mappingResult);
        },
    }
}

export default pesel;