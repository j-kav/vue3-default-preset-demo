import { createStore } from 'vuex'
import dogs from './modules/dogs';
import dogsFavourites from "./modules/dogsFavourites";

const store = createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        dogs,
        dogsFavourites,
    },
})

export default store;